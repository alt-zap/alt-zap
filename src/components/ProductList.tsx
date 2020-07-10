import React, { FC, useState, useCallback, useEffect } from 'react'
import { List } from 'antd'

import ProductSummary from './common/ProductSummary'

type Props = {
  items: TenantConfig['items']
  onOrder: (a: any) => void
}

const ProductList: FC<Props> = ({ items, onOrder }) => {
  const [quantities, setQuantities] = useState<Record<number, string>>({})
  const setForIndex = useCallback(
    (i) => (value: string) => setQuantities({ ...quantities, [i]: value }),
    [quantities]
  )

  useEffect(() => {
    const order = ((Object.keys(
      quantities
    ) as unknown) as number[]).map((i) => [
      items[i].name,
      parseInt(quantities[i], 10),
      items[i].price,
    ])

    onOrder(order)
  }, [items, onOrder, quantities])

  return (
    <div className="mt3">
      <h2 className="tc">Qual seu pedido?</h2>
      <div className="flex justify-center">
        <List
          style={{ maxWidth: '500px' }}
          itemLayout="horizontal"
          dataSource={items ? items.filter(({ live }) => live) : []}
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
    </div>
  )
}

export default ProductList
