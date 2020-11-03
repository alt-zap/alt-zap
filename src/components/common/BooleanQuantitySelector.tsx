import React, { FC, useMemo, useCallback } from 'react'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

type Props = {
  quantity?: string
  onQuantity?: (quantity: string) => void
  id?: string
  isMax?: boolean
}

const BooleanQuantitySelector: FC<Props> = ({
  quantity,
  onQuantity,
  id,
  isMax,
}) => {
  const checked = useMemo(() => quantity === '1', [quantity])

  const handleClick = useCallback(
    (e: CheckboxChangeEvent) => {
      onQuantity?.(e.target.checked ? '1' : '0')
    },
    [onQuantity]
  )

  return (
    <Checkbox
      disabled={isMax && !checked}
      id={id}
      style={{
        width: '25px',
        height: '25px',
      }}
      checked={checked}
      onChange={handleClick}
    />
  )
}

export default BooleanQuantitySelector
