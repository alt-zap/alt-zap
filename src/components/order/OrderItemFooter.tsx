import React, { FC } from 'react'

type Props = { quantity: string }
const OrderItemFooter: FC<Props> = ({ quantity }) => {
  return (
    <div className="b-black b-solid flex justify-around justify-end-l">
      <div />
    </div>
  )
}

export default OrderItemFooter
