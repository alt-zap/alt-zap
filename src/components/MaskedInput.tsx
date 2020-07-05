import React, { FC, useCallback, useMemo, useState } from 'react'
import { Input } from 'antd'
import IMask from 'imask'

const toString = (number: number) => {
  const str = number.toString()
  const len = str.length

  return `${str.slice(0, len - 2)},${str.slice(len - 2, len)}`
}

interface Props extends React.ComponentPropsWithoutRef<typeof Input> {
  mask: string
  experimentalNumber?: boolean
  placeholder: string
}

const MaskedInput: FC<Props> = ({
  mask,
  value: initialValue,
  experimentalNumber,
  placeholder,
  onChange,
  ...props
}) => {
  const masked = useMemo(
    () =>
      IMask.createMask({
        mask,
      }),
    [mask]
  )

  const [value, setValue] = useState(
    initialValue ? toString(initialValue as number) : null
  )

  const innerOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = masked.resolve(e.target.value)

      setValue(maskedValue)
      const num = maskedValue && parseInt(maskedValue.replace(',', ''), 10)
      const toSend = experimentalNumber ? num : maskedValue
      const event = {
        ...e,
        target: {
          ...e.target,
          value: toSend as React.ReactText,
        },
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onChange?.(event)
    },
    [experimentalNumber, masked, onChange]
  )

  return (
    <Input
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      value={experimentalNumber ? value : initialValue}
      addonBefore={experimentalNumber ? 'R$' : ''}
      placeholder={placeholder}
      onChange={innerOnChange}
    />
  )
}

export default MaskedInput
