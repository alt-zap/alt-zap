import { Tag, Switch } from 'antd'
import React, { FC, useMemo, useState } from 'react'

import { useTenant } from '../../../../../contexts/TenantContext'
import { useAltIntl } from '../../../../../intlConfig'
import { Product, Section } from '../../../../../typings'
import SortableList from './SortableList'

type Props = {
  onSortedProducts: (ids: string[]) => void
  selectedCategory: number
}

const SortProducts: FC<Props> = ({ onSortedProducts, selectedCategory }) => {
  const [{ products, tenant }] = useTenant()
  const intl = useAltIntl()
  const [isVisible, setIsVisible] = useState(false)

  // Not using the `visible` prop now, as we will implement it later
  const [productIds, setIds] = useState<Array<Section<string>>>(
    tenant?.sites?.zap.productMap[selectedCategory] ?? []
  )

  // Used to get the product's name and availability
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

  const handleChecked = () => setIsVisible(!isVisible)

  return (
    <SortableList
      list={productIds}
      getIdFromItem={(item) => `${item.element}`}
      renderItem={(item) => (
        <div className="flex  items-center justify-center">
          <div className="flex flex-column items-baseline">
            <span className="fw6 f5">{productsMap?.[item.element].name}</span>
            <Tag color={productsMap?.[item.element].live ? 'green' : 'red'}>
              {intl.formatMessage({
                id: productsMap?.[item.element].live
                  ? 'tenant.sites.active'
                  : 'tenant.sites.inactive',
              })}
            </Tag>
          </div>
          <Switch className="ml4" onChange={handleChecked} />
          {(item.visible = isVisible)}
        </div>
      )}
      onSortedList={(ids) => {
        setIds(ids)
        onSortedProducts(ids.map(({ element }) => element))
      }}
    />
  )
}

export default SortProducts
