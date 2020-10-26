import React, { FC, useState, useMemo, useCallback } from 'react'

import {
  useTenant,
  countProductPerCategory,
} from '../../../../../contexts/TenantContext'
import { useAltIntl } from '../../../../../intlConfig'
import { Section } from '../../../../../typings'
import SortableList from './SortableList'
import SwitchVisibility from './SwitchVisibility'

type Props = {
  onSortedCategories: (indexeds: Array<Section<number>>) => void
  loading?: boolean
}

const SortCategories: FC<Props> = ({ onSortedCategories, loading }) => {
  const [{ tenant, products }] = useTenant()
  const intl = useAltIntl()
  const [isVisible, setIsVisible] = useState(true)



  const [categoryIds, setIds] = useState<Array<Section<number>>>(
    tenant?.sites?.zap.categoryIds ?? []
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

  const handleCheckedItem = useCallback(
    (value: boolean, item: Section<number>) => {
      const newSections = categoryIds.map((section) =>
        section.element === item.element
          ? Object.assign(section, { visible: value })
          : section
      )

      setIds(newSections)
      onSortedCategories(newSections)
    },
    [setIds, onSortedCategories, categoryIds]
  )

  return (
    <SortableList
      list={categoryIds}
      getIdFromItem={(item) => `${item.element}`}
      renderItem={(item) => (
        <div className="flex items-center justify-between w-100">
          <div className="flex flex-column items-baseline">
            <span className="fw6 f5">
              {tenant?.categories?.[item.element]?.name}
            </span>
            <span className="light-silver">
              {intl.formatMessage(
                { id: 'tenant.categories.productCount' },
                { count: `${productsCount[item.element]}` }
              )}
            </span>
          </div>
          <SwitchVisibility
            checked={item.visible}
            disabled={loading}
            onChange={(value) => handleCheckedItem(value, item)}
            id={item.element}
          />
        </div>
      )}
      onSortedList={(ids) => {
        setIds(ids)
        onSortedCategories(ids.map(({ element }) => element))
      }}
    />
  )
}

export default SortCategories
