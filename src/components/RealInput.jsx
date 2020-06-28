import React from "react"
import { Input } from "antd"
import IMask from "imask"

const masked = IMask.createMask({
  mask: "00[0],00"
})

export default ({ value, onChange, ...props }) => {
  const innerOnChange = e => {
    var maskedValue = masked.resolve(e.target.value)
    onChange({ target: { value: maskedValue } })
  }

  return <Input {...props} value={value} onChange={innerOnChange} />
}
