import { Tag } from 'antd'
import React, { FC, useMemo, useState } from 'react'

import { useTenant } from '../../../../../contexts/TenantContext'
import { useAltIntl } from '../../../../../intlConfig'
import { Product } from '../../../../../typings'
import SortableList from './SortableList'

type Props = {
  onSortedProducts: (ids: string[]) => void
  selectedCategory: number
}

const SortProducts: FC<Props> = ({ onSortedProducts, selectedCategory }) => {
  const [{ products, tenant }] = useTenant()
  const intl = useAltIntl()

  // Not using the `visible` prop now, as we will implement it later
  const [productIds, setIds] = useState<string[]>(() =>
    (tenant?.sites?.zap.productMap[selectedCategory] ?? []).map(
      ({ element }) => element
    )
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
            {intl.formatMessage({
              id: productsMap?.[item].live
                ? 'tenant.sites.active'
                : 'tenant.sites.inactive',
            })}
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
