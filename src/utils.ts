import React, { useEffect, useRef } from 'react'

import {
  WorldAddress,
  OpeningHours,
  Days,
  Order,
  TenantConfig,
  OrderItem,
} from './typings'

type Elements = HTMLInputElement | HTMLTextAreaElement

export const eSet = (fn: (data: string) => void) => (
  e: React.ChangeEvent<Elements>
) => fn(e.target.value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (...msgs: any) => {
  // eslint-disable-next-line no-console
  if (window?.location?.hostname === 'localhost') console.log(...msgs)
}

const toString = (number: number) => {
  const str = number.toString()
  const len = str.length

  return `${str.slice(0, len - 2)},${str.slice(len - 2, len)}`
}

const LINE_BREAK = '\r\n'

const messageForAddress = (address?: WorldAddress) => {
  if (!address) return ''

  const {
    street,
    number,
    complement,
    district,
    city,
    state,
    additionalInfo,
  } = address

  return `${street} - ${number}
${complement ?? '(s/c)'} - ${district}
${city} - ${state}
*Referência:* ${additionalInfo}`
}

const messageForShipping = (order: Order, tenant: TenantConfig) => {
  const isDelivery = order.shipping?.type === 'DELIVERY'
  const method = isDelivery ? 'Entrega' : 'Retirada'

  const methodLine = `*Forma de Envio*: ${method}`
  const addressLabel = isDelivery
    ? `*Custo do Envio*: ${toString(
        order?.totalizers?.shippingPrice ?? 0
      )} \r\n*Endereço do Cliente*`
    : '*Endereço para Retirada*'

  return `${methodLine}
${addressLabel}
${messageForAddress(isDelivery ? order?.shipping?.address : tenant.address)}`
}

const messageForItems = (items: OrderItem[]) => {
  const messageForSubitems = (subitems: OrderItem['selectedItems']) => {
    return subitems
      .filter(({ options }) => options.some(({ quantity }) => quantity > 0))
      .map(({ name, options }) => {
        const optionsToDisplay = options.filter(({ quantity }) => quantity > 0)
        const messageForOptions =
          optionsToDisplay.length === 1 && optionsToDisplay[0].quantity === 1
            ? optionsToDisplay[0].name
            : optionsToDisplay
                .map(({ name: _name, quantity }) => `${_name}(${quantity})`)
                .join(' - ')

        return `  *${name}*: ${messageForOptions}`
      })
      .join(LINE_BREAK)
  }

  const messageForItem = (item: OrderItem) => {
    const { product, quantity } = item

    const quantityName = `*${quantity}* - ${product.name}`
    const options = messageForSubitems(item.selectedItems)
    const info = item.info?.length ? `  *Obs:* ${item.info}` : ''

    const lines = [quantityName, options, info]

    return lines.filter((str) => str?.length > 0).join(LINE_BREAK)
  }

  const message = items
    .filter(({ quantity }) => parseInt(`${quantity}`, 10) > 0)
    .map(messageForItem)
    .join(`${LINE_BREAK}${LINE_BREAK}`)

  return message
}

export const generateLink = (order: Order, tenant: TenantConfig) => {
  // eslint-disable-next-line no-shadow
  const itemsSection = messageForItems(order.items)

  const text = `*Novo Pedido!*
*Nome do Cliente:* ${order?.customer?.name}
*Itens do Pedido:*
${itemsSection + LINE_BREAK}
*Total do Pedido:* R$ ${toString(order.totalizers?.finalPrice ?? 0)}

${messageForShipping(order, tenant)}
${
  order.info
    ? `
*Outras Informações:*`
    : ''
}
${order.info ?? ''} 

*Meio de Pagamento:* ${order.payment?.type.name}
${
  order.payment?.changeFor
    ? `Precisa de troco para R$ *${order.payment?.changeFor}*`
    : ''
}`

  return `https://api.whatsapp.com/send?phone=${
    tenant?.whatsapp
  }&text=${window.encodeURIComponent(text)}`
}

export const generateGoogleMapsLink = (address?: WorldAddress) => {
  if (!address) return '#'

  const query = window.encodeURIComponent(
    `${address.street} ${address.number} ${address.district} ${address.city} ${address.state}`
  )

  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function createCtx<A extends {} | null>() {
  const ctx = React.createContext<A | undefined>(undefined)

  function useCtx() {
    const c = React.useContext(ctx)

    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value')

    return c
  }

  return [useCtx, ctx.Provider] as const // 'as const' makes TypeScript infer a tuple
}

export type Element<ArrayType extends readonly unknown[]> = ArrayType[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sanitizeForFirebase = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') sanitizeForFirebase(obj[key])
    else if (obj[key] === undefined) delete obj[key]
  })

  return obj
}

export const isTenantOpen = (hours: OpeningHours, today: Date = new Date()) => {
  /**
   * It maps our Days constant values (defined by the tenant) to
   * Javascript's getDay()
   */
  const daysMap: Record<number, Days[]> = {
    0: ['ALL', 'WEEKEND', 'SUNDAY'],
    1: ['ALL', 'WEEKDAYS', 'MONDAY'],
    2: ['ALL', 'WEEKDAYS', 'TUESDAY'],
    3: ['ALL', 'WEEKDAYS', 'WEDNESDAY'],
    4: ['ALL', 'WEEKDAYS', 'THURSDAY'],
    5: ['ALL', 'WEEKDAYS', 'FRIDAY'],
    6: ['ALL', 'WEEKEND', 'SATURDAY'],
  }

  const validTimeFrames = daysMap[today.getDay()]

  return hours.intervals
    .filter(({ days }) => validTimeFrames.includes(days))
    .some(({ from: fromRaw, to: toRaw }) => {
      // Time is stored in ISO format
      const [from, to] = [fromRaw, toRaw].map((str) => {
        const onToday = new Date()
        const settedDate = new Date(str)

        onToday.setHours(settedDate.getHours())
        onToday.setMinutes(settedDate.getMinutes())

        return onToday
      })

      const afterFrom = today >= from

      const beforeTo = today <= to

      return afterFrom && beforeTo
    })
}

// Thanks, Dan
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}

export const generateHash = (length: number) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}
