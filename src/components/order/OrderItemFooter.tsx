import { Divider, Form } from 'antd'
import React, { FC } from 'react'

import LeanQuantitySelector from '../common/LeanQuantitySelector'
import AddButton from './AddButton'

type Props = {
  totalPrice: number
  min?: number
  loading?: boolean
}

const OrderItemFooter: FC<Props> = ({ min = 1, totalPrice, loading }) => {
  return (
    <>
      <Divider />
      <div className="b-black b-solid flex justify-around justify-end-ns items-center mb3">
        <div className="flex">
          <div className="mr2">
            <Form.Item name="quantity" initialValue="1">
              <QuantityWrapper min={min} />
            </Form.Item>
          </div>
          <div className="mr0 mr2-ns">
            <AddButton
              type="submit"
              label="Adicionar"
              price={totalPrice}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  )
}

type QuantityWrapperProps = {
  value?: string
  onChange?: (data: string) => void
  min: number
}

const QuantityWrapper: FC<QuantityWrapperProps> = ({
  value,
  onChange,
  min,
}) => {
  return (
    <LeanQuantitySelector
      quantity={value}
      onQuantity={onChange}
      min={min}
      dimension="37px"
    />
  )
}

export default OrderItemFooter
