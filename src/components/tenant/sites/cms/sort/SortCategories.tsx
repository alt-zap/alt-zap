import React, { FC, useState, useMemo } from 'react'

import {
  useTenant,
  countProductPerCategory,
} from '../../../../../contexts/TenantContext'
import { useAltIntl } from '../../../../../intlConfig'
import SortableList from './SortableList'

type Props = {
  onSortedCategories: (indexeds: number[]) => void
}

const SortCategories: FC<Props> = ({ onSortedCategories }) => {
  const [{ tenant, products }] = useTenant()
  const intl = useAltIntl()

  // Not using the `visible` prop now, as we will implement it later
  const [categoryIds, setIds] = useState<number[]>(
    (tenant?.sites?.zap.categoryIds ?? []).map(({ element }) => element)
  )

  // Used to get the products' count. It'd be great to have this on the Context, as we already
  // use it on the Categories component
  const productsCount = useMemo(() => {
    if (!products) return []

    return (
      tenant?.categories?.map((_, index) =>
        countProductPerCategory(index, products)
      ) ?? []
    )
  }, [tenant, products])

  return (
    <SortableList
      list={categoryIds}
      getIdFromItem={(item) => `${item}`}
      renderItem={(item) => (
        <div className="flex flex-column">
          <span className="fw6 f5">{tenant?.categories?.[item]?.name}</span>
          <span className="light-silver">
            {intl.formatMessage(
              { id: 'tenant.categories.productCount' },
              { count: `${productsCount[item]}` }
            )}
          </span>
        </div>
      )}
      onSortedList={(ids) => {
        setIds(ids)
        onSortedCategories(ids)
      }}
    />
  )
}

export default SortCategories
