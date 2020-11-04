import { Tag } from 'antd'
import React, { FC, useCallback, useMemo, useState } from 'react'

import { useTenant } from '../../../../../contexts/TenantContext'
import { useAltIntl } from '../../../../../intlConfig'
import { Product, Section } from '../../../../../typings'
import SortableList from './SortableList'
import SwitchVisibility from './SwitchVisibility'

type Props = {
  onSortedProducts: (ids: Array<Section<string>>) => void
  selectedCategory: number
  loading?: boolean
}

const SortProducts: FC<Props> = ({
  onSortedProducts,
  selectedCategory,
  loading,
}) => {
  const [{ products, tenant }] = useTenant()
  const intl = useAltIntl()

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

  const handleCheckedItem = useCallback(
    (value: boolean, item: Section<string>) => {
      const newSections = productIds.map((section) =>
        section.element === item.element
          ? Object.assign(section, { visible: value })
          : section
      )

      setIds(newSections)
      onSortedProducts(newSections)
    },
    [setIds, onSortedProducts, productIds]
  )

  return (
    <SortableList
      list={productIds}
      getIdFromItem={(item) => `${item.element}`}
      renderItem={(item) => (
        <div className="flex  items-center justify-between w-100">
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
          <SwitchVisibility
            checked={item.visible}
            disabled={loading}
            onChange={(value) => handleCheckedItem(value, item)}
          />
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
