export const eSet = fn => e => fn(e.target.value)

export const log = (...msgs) => {
  if (process.env.NODE_ENV === 'development') console.log(...msgs)
}

const toString = number => {
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
${complemento || '(s/c)'} - ${bairro}

*Outras Informações:*
${info} 

  
*Meio de Pagamento:* ${label}
${change ? `Precisa de troco para R$ *${change}*` : ''}`

  return `https://api.whatsapp.com/send?phone=${whatsapp}&text=${window.encodeURIComponent(
    text
  )}`
}
