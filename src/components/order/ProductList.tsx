import React, { FC, useState, useCallback } from 'react'
import { List, Divider, Affix } from 'antd'

import { Product, Category } from '../../typings'
import ProductSummary from '../common/ProductSummary'
import MenuSearch from './MenuSearch'
import { useSearch } from './useSearch'

export type Section = {
  name: string
  products: Product[]
}

type Props = {
  sections: Section[]
}

const ProductList: FC<Props> = ({ sections }) => {
  const [quantities, setQuantities] = useState<Record<number, string>>({})
  const setForIndex = useCallback(
    (i) => (value: string) => setQuantities({ ...quantities, [i]: value }),
    [quantities]
  )

  const { setQuery, filteredSections } = useSearch(sections)

  const shouldDisplayName = sections?.length > 1

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
            {shouldDisplayName && <Divider>{name}</Divider>}
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

export default ProductList
