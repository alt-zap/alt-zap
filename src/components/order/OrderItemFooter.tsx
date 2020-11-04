import { Divider, Form } from 'antd'
import { styled } from 'linaria/react'
import React, { FC } from 'react'

import LeanQuantitySelector from '../common/LeanQuantitySelector'
import AddButton from './AddButton'

type Props = {
  totalPrice: number
  min?: number
  loading?: boolean
}

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: space-around;
  }
`

const OrderItemFooter: FC<Props> = ({ min = 1, totalPrice, loading }) => {
  return (
    <>
      <Divider />
      <Content>
        <div className="flex justify-around w-100">
          <div className="mh4">
            <Form.Item name="quantity" initialValue="1">
              <QuantityWrapper min={min} />
            </Form.Item>
          </div>
          <div className="mr4">
            <AddButton
              type="submit"
              label="Adicionar"
              price={totalPrice}
              loading={loading}
            />
          </div>
        </div>
      </Content>
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
      dimension="43px"
    />
  )
}

export default OrderItemFooter
