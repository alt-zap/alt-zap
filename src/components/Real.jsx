const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
})

export default ({ cents }) => {
  const parsedCents = parseInt(cents, 10)
  return formatter.format(parsedCents / 100)
}
