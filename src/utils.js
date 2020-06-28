export const eSet = fn => e => fn(e.target.value)

export const generateLink = ({ address, order, paymentInfo, info }) => {
  const { logradouro, numero, complemento, bairro } = address
  const items = order
    .map(([name, quantity]) => `*${quantity}* - ${name}`)
    .join("\r\n")
  const text = `*Novo Pedido!*

  *Items:*
  ${items}

  *Endereço:* 
  ${logradouro} - ${numero}
  ${complemento || "(s/c)"} - ${bairro}

  *Outras Informações:*
  ${info} 
  `

  return `https://api.whatsapp.com/send?phone=5583987599425&text=${window.encodeURIComponent(
    text
  )}`
}
