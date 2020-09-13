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
      // Identify which it it refers to
      // Add if doesn't exist
      dispatch({
        type: 'UPSERT_ITEM',
        args: {
          product,
          quantity: parseInt(qt, 10),
          itemPrice: product.price,
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
