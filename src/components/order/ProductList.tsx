import React, { FC, useState, useCallback, useEffect } from 'react'
import { List, Divider } from 'antd'

import { Product } from '../../typings'
import ProductSummary from '../common/ProductSummary'

type NestedProducts = {
  categories: Array<{
    name: string
    products: Product[]
  }>
}

type Props = {
  nestedProducts: NestedProducts
  onOrder: (a: any) => void
}

const ProductList: FC<Props> = ({ nestedProducts, onOrder }) => {
  const [quantities, setQuantities] = useState<Record<number, string>>({})
  const setForIndex = useCallback(
    (i) => (value: string) => setQuantities({ ...quantities, [i]: value }),
    [quantities]
  )

  // useEffect(() => {
  //   const orderItems = ((Object.keys(
  //     quantities
  //   ) as unknown) as number[]).map((i) => [
  //     products?.[i].name,
  //     parseInt(quantities[i], 10),
  //     products?.[i].price,
  //   ])

  //   onOrder(orderItems)
  // }, [products, onOrder, quantities])

  return (
    <div className="mt3">
      <h2 className="tc">Qual seu pedido?</h2>
      <div className="flex flex-column">
        {nestedProducts.categories.map(({ name, products }) => (
          <div key={name}>
            <Divider>{name}</Divider>
            <List
              style={{ maxWidth: '500px' }}
              itemLayout="horizontal"
              dataSource={products}
              renderItem={(product, i) => (
                <div className="pv2">
                  <ProductSummary
                    product={product}
                    selectedQuantity={quantities[i] || '0'}
                    setQuantity={setForIndex(i)}
                  />
                </div>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Filtering
// Live products

export default ProductList
