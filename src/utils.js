export const eSet = fn => e => fn(e.target.value)

export const generateLink = ({
  name,
  address,
  order,
  payment,
  total,
  info
}) => {
  const { logradouro, numero, complemento, bairro } = address
  const { label, change } = payment
  const items = order
    .map(([name, quantity]) => `*${quantity}* - ${name}`)
    .join("\r\n")
  const text = `*Novo Pedido!*
*Nome:* ${name}

*Itens:*
${items}
*Total do Pedido:* R$ ${total}

*Endereço:* 
${logradouro} - ${numero}
${complemento || "(s/c)"} - ${bairro}

*Outras Informações:*
${info} 

  
*Meio de Pagamento:* ${label}
${change ? `Precisa de troco para R$ *${change}*` : ""}`

  return `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_PHONE_NUMBER}&text=${window.encodeURIComponent(
    text
  )}`
}
