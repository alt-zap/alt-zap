import React, { FC, useCallback } from 'react'
import { Input, Button } from 'antd'

type Props = {
  min?: number
  max?: number
  quantity: string
  onQuantity: (data: string) => void
}

const QuantitySelector: FC<Props> = ({
  min = 0,
  max = 20,
  quantity,
  onQuantity,
}) => {
  const inc = useCallback(() => {
    const val = parseInt(quantity, 10)

    onQuantity(val >= max ? quantity : `${val + 1}`)
  }, [onQuantity, quantity, max])

  const dec = useCallback(() => {
    const val = parseInt(quantity, 10)

    onQuantity(val <= min ? quantity : `${val - 1}`)
  }, [onQuantity, quantity, min])

  return (
    <div className="flex w-20 ml2" style={{ minWidth: '80px' }}>
      <Button
        type="primary"
        className="ph2 pv1 mr1 tc"
        style={{ minWidth: '27px' }}
        disabled={!quantity || parseInt(quantity, 10) === min}
        onClick={dec}
      >
        -
      </Button>
      <Input value={quantity} className="pa1 tc" />
      <Button
        type="primary"
        className="ph2 pv1 ml1 tc"
        style={{ minWidth: '27px' }}
        disabled={parseInt(quantity, 10) === max}
        onClick={inc}
      >
        +
      </Button>
    </div>
  )
}

export default QuantitySelector
