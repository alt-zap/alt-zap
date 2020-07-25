import React, { Fragment } from 'react'
const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
const Real = ({ cents }) => {
  const parsedCents = typeof cents === 'string' ? parseInt(cents, 10) : cents
  return React.createElement(
    Fragment,
    null,
    formatter.format(parsedCents / 100)
  )
}
export default Real
