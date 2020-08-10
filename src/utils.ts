import React, { useEffect, useRef } from 'react'

import { Address, OrderProducts, OpeningHours, Days } from './typings'

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
  address: Address
  order: OrderProducts[]
  payment: {
    label: string
    change?: string
  }
  total: number
  info?: string
  whatsapp: string
}

export const generateLink = ({
  name,
  address,
  order,
  payment,
  total,
  info,
  whatsapp,
}: GenerateLinkParams) => {
  const { logradouro, numero, complemento, bairro } = address
  const { label, change } = payment
  const items = order
    // eslint-disable-next-line no-shadow
    .map(([name, quantity]) => `*${quantity}* - ${name}`)
    .join('\r\n')

  const text = `*Novo Pedido!*
*Nome:* ${name}

*Itens:*
${items}
*Total do Pedido:* R$ ${toString(total)}

*Endereço:* 
${logradouro} - ${numero}
${complemento ?? '(s/c)'} - ${bairro}

*Outras Informações:*
${info} 

  
*Meio de Pagamento:* ${label}
${change ? `Precisa de troco para R$ *${change}*` : ''}`

  return `https://api.whatsapp.com/send?phone=${whatsapp}&text=${window.encodeURIComponent(
    text
  )}`
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

export const isTenantOpen = (hours: OpeningHours) => {
  const today = new Date()

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
      const [from, to] = [fromRaw, toRaw].map((str) => new Date(str))
      const afterFrom =
        today.getHours() >= from.getHours() &&
        today.getMinutes() >= from.getMinutes()

      const beforeTo =
        today.getHours() <= to.getHours() &&
        today.getMinutes() <= to.getMinutes()

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
