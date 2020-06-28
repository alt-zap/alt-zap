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

  *Items:*
  ${items}

  *Endereço:* 
  ${logradouro} - ${numero}
  ${complemento || "(s/c)"} - ${bairro}

  *Outras Informações:*
  ${info} 

  *Total do Pedido:* ${total}
  *Meio de Pagamento:* ${label}
  ${change ? `Precisa de troco para *${change}*` : ""}
  `

  return `https://api.whatsapp.com/send?phone=5583987599425&text=${window.encodeURIComponent(
    text
  )}`
}
