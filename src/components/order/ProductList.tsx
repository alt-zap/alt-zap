import React, { FC, useState, useCallback, useEffect } from 'react'
import { List, Divider, Affix } from 'antd'

import { Product, Category } from '../../typings'
import ProductSummary from '../common/ProductSummary'
import MenuSearch from './MenuSearch'
import { useSearch } from './useSearch'

type Section = {
  name: string
  products: Product[]
}

type Props = {
  sections: Section[]
  onOrder: (a: any) => void
}

const ProductList: FC<Props> = ({ sections, onOrder }) => {
  const [quantities, setQuantities] = useState<Record<number, string>>({})
  const setForIndex = useCallback(
    (i) => (value: string) => setQuantities({ ...quantities, [i]: value }),
    [quantities]
  )

  const { setQuery, filteredSections } = useSearch(sections)

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
        <div>
          <Affix>
            <MenuSearch
              setQuery={setQuery}
              availableSections={sections as Category[]}
            />
          </Affix>
        </div>
        {filteredSections.map(({ name, products }) => (
          <div id="name" key={name}>
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
