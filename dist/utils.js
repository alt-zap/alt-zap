import React from 'react'
export const eSet = (fn) => (e) => fn(e.target.value)
export const log = (...msgs) => {
  var _a, _b
  if (
    ((_b = (_a = window) === null || _a === void 0 ? void 0 : _a.location) ===
      null || _b === void 0
      ? void 0
      : _b.hostname) === 'localhost'
  )
    console.log(...msgs)
}
const toString = (number) => {
  const str = number.toString()
  const len = str.length
  return `${str.slice(0, len - 2)},${str.slice(len - 2, len)}`
}
export const generateLink = ({
  name,
  address,
  order,
  payment,
  total,
  info,
  whatsapp,
}) => {
  const { logradouro, numero, complemento, bairro } = address
  const { label, change } = payment
  const items = order
    .map(([name, quantity]) => `*${quantity}* - ${name}`)
    .join('\r\n')
  const text = `*Novo Pedido!*
*Nome:* ${name}

*Itens:*
${items}
*Total do Pedido:* R$ ${toString(total)}

*Endereço:* 
${logradouro} - ${numero}
${
  complemento !== null && complemento !== void 0 ? complemento : '(s/c)'
} - ${bairro}

*Outras Informações:*
${info} 

  
*Meio de Pagamento:* ${label}
${change ? `Precisa de troco para R$ *${change}*` : ''}`
  return `https://api.whatsapp.com/send?phone=${whatsapp}&text=${window.encodeURIComponent(
    text
  )}`
}
export function createCtx() {
  const ctx = React.createContext(undefined)
  function useCtx() {
    const c = React.useContext(ctx)
    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider]
}
