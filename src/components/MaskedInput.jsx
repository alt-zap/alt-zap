import React, { useMemo, useState } from "react"
import { Input } from "antd"
import IMask from "imask"

const toString = number => {
  const str = number.toString()
  const len = str.length
  return `${str.slice(0, len - 2)},${str.slice(len - 2, len)}`
}
export default ({
  mask,
  value: initialValue,
  experimentalNumber,
  onChange,
  ...props
}) => {
  const masked = useMemo(
    () =>
      IMask.createMask({
        mask
      }),
    [mask]
  )

  const [value, setValue] = useState(
    initialValue ? toString(initialValue) : null
  )

  const innerOnChange = e => {
    var maskedValue = masked.resolve(e.target.value)
    setValue(maskedValue)
    const number = maskedValue && parseInt(maskedValue.replace(",", ""), 10)
    const toSend = experimentalNumber ? number : maskedValue
    onChange({ target: { value: toSend } })
  }

  return (
    <Input
      {...props}
      addonBefore={experimentalNumber ? 'R$' : ''}
      value={experimentalNumber ? value : initialValue}
      onChange={innerOnChange}
    />
  )
}
