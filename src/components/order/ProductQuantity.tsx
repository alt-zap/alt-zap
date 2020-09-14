import React, { FC, useCallback, useState } from 'react'

import { useOrderDispatch } from '../../contexts/order/OrderContext'
import { Product } from '../../typings'
import QuantitySelector from '../common/QuantitySelector'

type Props = { product: Product }

const ProductQuantity: FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState('0')
  const dispatch = useOrderDispatch()

  const handleQuantity = useCallback(
    (qt: string) => {
      const itemQuantity = parseInt(qt, 10)
      const itemPrice = product.price * itemQuantity

      dispatch({
        type: 'UPSERT_ITEM',
        args: {
          product,
          quantity: itemQuantity,
          itemPrice,
          selectedItems: [],
        },
      })
      setQuantity(qt)
    },
    [setQuantity, dispatch, product]
  )

  return <QuantitySelector quantity={quantity} onQuantity={handleQuantity} />
}

export default ProductQuantity
