import React, { useEffect, useRef } from 'react'

import {
  WorldAddress,
  OrderProducts,
  OpeningHours,
  Days,
  Order,
  TenantConfig,
} from './typings'
import { ShippingMethod } from './components/order/SelectShipping'

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

type GenerateLinkParams = {
  name: string
  address: WorldAddress
  tenantAddress: WorldAddress
  shippingMethod: ShippingMethod
  order: OrderProducts[]
  payment: {
    label: string
    change?: string
  }
  total: number
  info?: string
  whatsapp: string
}

const messageForAddress = (address?: WorldAddress) => {
  if (!address) return ''

  const { street, number, complement, district, city, state } = address

  return `${street} - ${number}
${complement ?? '(s/c)'} - ${district}
${city} - ${state}`
}

const messageForShipping = (order: Order, tenant: TenantConfig) => {
  const isDelivery = order.shipping?.type === 'DELIVERY'
  const method = isDelivery ? 'Entrega' : 'Retirada'

  const methodLine = `*Forma de Envio*: ${method}`
  const addressLabel = isDelivery
    ? `*Custo do Envio*: ${toString(
        order?.shipping?.price ?? 0
      )} \r\n*Endereço do Cliente*`
    : '*Endereço para Retirada*'

  return `${methodLine}
${addressLabel}
${messageForAddress(isDelivery ? order?.shipping?.address : tenant.address)}`
}

export const generateLink = (order: Order, tenant: TenantConfig) => {
  // eslint-disable-next-line no-shadow
  const itemsSection = order.items
    .filter(({ quantity }) => parseInt(`${quantity}`, 10) > 0)
    .map(({ product, quantity }) => `*${quantity}* - ${product.name}`)
    .join('\r\n')

  const text = `*Novo Pedido!*
*Nome do Cliente:* ${order?.customer?.name}

*Itens do Pedido:*
${itemsSection}
*Total do Pedido:* R$ ${toString(order.totalizers?.totalPrice ?? 0)}

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
