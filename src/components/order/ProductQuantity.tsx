import React, { FC, useCallback, useMemo } from 'react'

import { useOrder } from '../../contexts/order/OrderContext'
import { Product } from '../../typings'
import QuantitySelector from '../common/QuantitySelector'

type Props = { product: Product }

const ProductQuantity: FC<Props> = ({ product }) => {
  const [{ order }, dispatch] = useOrder()

  const quantity = useMemo(() => {
    // A bit error prone. I think we should normalized the items later or have a better approach.
    // In fact, later we should remove this from the product list. We are only showing because,
    // now there's a 1-to-1 mapping on item<->product
    return (
      order?.items.find(({ product: orderProduct }) => orderProduct === product)
        ?.quantity ?? 0
    ).toString()
  }, [order, product])

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
    },
    [dispatch, product]
  )

  return <QuantitySelector quantity={quantity} onQuantity={handleQuantity} />
}

export default ProductQuantity
