import React, { useMemo, useState } from "react"
import { Input } from "antd"
import IMask from "imask"

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
    initialValue ? masked.resolve(initialValue.toString()) : null
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
      value={experimentalNumber ? value : initialValue}
      onChange={innerOnChange}
    />
  )
}
