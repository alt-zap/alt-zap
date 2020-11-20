import { styled } from 'linaria/react'
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
  onSelectCategory: (index: number) => void
}

const SortCategories: FC<Props> = ({
  onSortedCategories,
  loading,
  onSelectCategory,
}) => {
  const [{ tenant, products }] = useTenant()
  const intl = useAltIntl()

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
            <CategoryTitle
              onClick={(e) => {
                onSelectCategory(item.element)
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              {tenant?.categories?.[item.element]?.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="14"
                height="14"
                style={{
                  fill: 'rgba(0, 0, 0, 0.65)',
                }}
                className="ml1 mt1"
              >
                <path d="M476.853 35.148c-46.864-46.864-122.842-46.864-169.706-.001L206.853 135.441c-48.475 48.477-43.987 125.717 0 169.706 7.366 7.366 15.516 13.372 24.122 18.305l18.305-18.305c12.006-12.008 7.78-26.045 7.564-36.174-2.635-1.868-5.198-3.887-7.564-6.253-22.573-22.571-23.588-61.265 0-84.853L349.572 77.575c23.399-23.399 61.454-23.399 84.853 0 23.399 23.399 23.399 61.454 0 84.853l-66.293 66.293c1.917 10.607 13.422 35.733 7.504 77.181.289-.284.635-.467.923-.754l100.294-100.294c46.862-46.864 46.862-122.842 0-169.706z" />
                <path d="M312.918 199.081c-7.365-7.366-15.516-13.372-24.12-18.305l-18.305 18.305c-12.008 12.006-7.782 26.043-7.566 36.172 2.637 1.868 5.2 3.887 7.566 6.253 22.573 22.573 23.588 61.265 0 84.853L162.427 434.425c-23.399 23.399-61.454 23.399-84.853 0-23.399-23.399-23.399-61.454 0-84.853l74.067-74.067c-1.917-10.607-13.423-35.733-7.504-77.181-.289.284-.637.469-.925.756L35.147 307.147c-46.862 46.864-46.862 122.842 0 169.706 46.864 46.862 122.841 46.862 169.705 0l108.066-108.066c47.576-47.576 44.976-124.731 0-169.706z" />
              </svg>
            </CategoryTitle>
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
            htmlFor={item.element?.toString()}
          />
        </div>
      )}
      onSortedList={(ids) => {
        setIds(ids)
        onSortedCategories(ids)
      }}
    />
  )
}

const CategoryTitle = styled.a`
  font-weight: bold;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.65);
  display: flex;
  :hover {
    color: #001529;
  }
`

export default SortCategories
