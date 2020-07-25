var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
import React, { useCallback, useMemo, useState } from 'react'
import { Input } from 'antd'
import IMask from 'imask'
const toString = (number) => {
  const str = number.toString()
  const len = str.length
  return `${str.slice(0, len - 2)},${str.slice(len - 2, len)}`
}
const MaskedInput = (_a) => {
  var {
      mask,
      value: initialValue,
      experimentalNumber,
      placeholder,
      onChange,
    } = _a,
    props = __rest(_a, [
      'mask',
      'value',
      'experimentalNumber',
      'placeholder',
      'onChange',
    ])
  const masked = useMemo(
    () =>
      IMask.createMask({
        mask,
      }),
    [mask]
  )
  const [value, setValue] = useState(
    initialValue ? toString(initialValue) : null
  )
  const innerOnChange = useCallback(
    (e) => {
      var _a
      const maskedValue = masked.resolve(e.target.value)
      setValue(maskedValue)
      const num = maskedValue && parseInt(maskedValue.replace(',', ''), 10)
      const toSend = experimentalNumber ? num : maskedValue
      const event = Object.assign(Object.assign({}, e), {
        target: Object.assign(Object.assign({}, e.target), { value: toSend }),
      })
      ;(_a = onChange) === null || _a === void 0 ? void 0 : _a(event)
    },
    [experimentalNumber, masked, onChange]
  )
  return React.createElement(
    Input,
    Object.assign({}, props, {
      value: experimentalNumber ? value : initialValue,
      addonBefore: experimentalNumber ? 'R$' : '',
      placeholder: placeholder,
      onChange: innerOnChange,
    })
  )
}
export default MaskedInput
