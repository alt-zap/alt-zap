import React from 'react'

type Elements = HTMLInputElement | HTMLTextAreaElement

export const eSet = (fn: (data: string) => void) => (
  e: React.ChangeEvent<Elements>
) => fn(e.target.value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (...msgs: any) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'development') console.log(...msgs)
}

const toString = (number: number) => {
  const str = number.toString()
  const len = str.length

  return `${str.slice(0, len - 2)},${str.slice(len - 2, len)}`
}

type GenerateLinkParams = {
  name: string
  address: Address
  order: Array<[string, string]>
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
