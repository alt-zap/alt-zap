import { Tag } from 'antd'
import React, { FC, useMemo, useState } from 'react'

import { useTenant } from '../../../../../contexts/TenantContext'
import { Product } from '../../../../../typings'
import SortableList from './SortableList'

type Props = {
  onSortedProducts: (ids: string[]) => void
  selectedCategory: number
}

const SortProducts: FC<Props> = ({ onSortedProducts, selectedCategory }) => {
  const [{ products }] = useTenant()

  // TODO: Get sections from Tenant
  const [productIds, setIds] = useState(
    () =>
      products
        ?.filter(({ category }) => category === selectedCategory)
        .map(({ id }) => id ?? '') ?? []
  )

  const productsMap = useMemo(
    () =>
      products?.reduce(
        (acc, product) => ({
          ...acc,
          [product.id ?? '']: product,
        }),
        {} as Record<string, Product>
      ),
    [products]
  )

  return (
    <SortableList
      list={productIds}
      getIdFromItem={(item) => `${item}`}
      renderItem={(item) => (
        <div className="flex flex-column items-baseline">
          <span className="fw6 f5">{productsMap?.[item].name}</span>
          <Tag color={productsMap?.[item].live ? 'green' : 'red'}>
            {productsMap?.[item].live ? 'Ativo' : 'Inativo'}
          </Tag>
        </div>
      )}
      onSortedList={(ids) => {
        setIds(ids)
        onSortedProducts(ids)
      }}
    />
  )
}

export default SortProducts
