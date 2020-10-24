import React, { FC } from 'react'

import LeanQuantitySelector from '../common/LeanQuantitySelector'
import AddButton from './AddButton'

type Props = { quantity: string }

const OrderItemFooter: FC<Props> = ({ quantity }) => {
  return (
    <div className="b-black b-solid flex justify-around justify-end-l">
      <div className="flex">
        <LeanQuantitySelector quantity={quantity} min={1} />
        {/* <AddButton /> */}
      </div>
    </div>
  )
}

export default OrderItemFooter
