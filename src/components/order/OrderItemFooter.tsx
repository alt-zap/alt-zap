import { Divider } from 'antd'
import React, { FC } from 'react'

import LeanQuantitySelector from '../common/LeanQuantitySelector'
import AddButton from './AddButton'

type Props = {
  totalPrice: number
  min?: number
  quantity: string
  loading: boolean
  onQuantity: (qt: string) => void
  onSubmit: () => void
}

const OrderItemFooter: FC<Props> = ({
  min = 1,
  totalPrice,
  quantity,
  onQuantity,
  onSubmit,
  loading,
}) => {
  return (
    <>
      <Divider />
      <div className="b-black b-solid flex justify-around justify-end-ns items-center mb3">
        <div className="flex">
          <div className="mr2">
            <LeanQuantitySelector
              quantity={quantity}
              onQuantity={onQuantity}
              min={min}
              dimension="37px"
            />
          </div>
          <div className="mr0 mr2-ns">
            <AddButton
              label="Adicionar"
              price={totalPrice}
              loading={loading}
              onClick={() => onSubmit()}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderItemFooter
