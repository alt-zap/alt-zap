import React, { useMemo } from "react"
import { Input } from "antd"
import IMask from "imask"

export default ({ mask, value, onChange, ...props }) => {
  const masked = useMemo(
    () =>
      IMask.createMask({
        mask
      }),
    [mask]
  )

  const innerOnChange = e => {
    var maskedValue = masked.resolve(e.target.value)
    onChange({ target: { value: maskedValue } })
  }

  return <Input {...props} value={value} onChange={innerOnChange} />
}
