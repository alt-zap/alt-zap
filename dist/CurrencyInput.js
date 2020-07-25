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
import React, { useCallback, useMemo } from 'react'
import { Input } from 'antd'
const getDigitsFromValue = (value = '') =>
  value.replace(/(-(?!\d))|[^0-9|-]/g, '') || ''
const padDigits = (digits) => {
  const desiredLength = 3
  const actualLength = digits.length
  if (actualLength >= desiredLength) {
    return digits
  }
  const amountToAdd = desiredLength - actualLength
  const padding = '0'.repeat(amountToAdd)
  return padding + digits
}
const removeLeadingZeros = (number) => number.replace(/^0+([0-9]+)/, '$1')
const addDecimalToNumber = (number, separator) => {
  const centsStartingPosition = number.length - 2
  const dollars = removeLeadingZeros(number.substring(0, centsStartingPosition))
  const cents = number.substring(centsStartingPosition)
  return dollars + separator + cents
}
export const toCurrency = (value, separator) => {
  const digits = getDigitsFromValue(value)
  const digitsWithPadding = padDigits(digits)
  return addDecimalToNumber(digitsWithPadding, separator)
}
const CurrencyInput = (_a) => {
  var { onChange, separator = ',', value } = _a,
    props = __rest(_a, ['onChange', 'separator', 'value'])
  const handleChange = useCallback(
    (event) => {
      var _a
      const { value: stringValue } = event.target
      const cents =
        typeof stringValue === 'string'
          ? parseInt(stringValue.replace(',', ''), 10)
          : undefined
      event.persist()
      ;(_a = onChange) === null || _a === void 0
        ? void 0
        : _a({
            target: { value: cents },
          })
    },
    [onChange]
  )
  const innerValue = useMemo(() => {
    const stringValue = typeof value === 'number' ? value.toString() : null
    if (stringValue) {
      return toCurrency(stringValue, separator)
    }
  }, [value, separator])
  return React.createElement(
    Input,
    Object.assign({ inputMode: 'numeric', pattern: '[0-9,]*' }, props, {
      value: innerValue,
      onChange: handleChange,
    })
  )
}
export default CurrencyInput
