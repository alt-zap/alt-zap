import React, { FC, useState } from 'react'

import { useTenant } from '../../../../../contexts/TenantContext'
import SortableList from './SortableList'

type Props = {
  onSortedCategories: (indexeds: number[]) => void
}

const SortCategories: FC<Props> = ({ onSortedCategories }) => {
  const [{ tenant }] = useTenant()

  // TODO: Get from Tenant
  const [categoryIds, setIds] = useState<number[]>(
    tenant?.categories?.map((_, i) => i) ?? []
  )

  return (
    <SortableList
      list={categoryIds}
      getIdFromItem={(item) => `${item}`}
      renderItem={(item) => (
        <div className="flex flex-column">
          <span className="fw6 f5">{tenant?.categories?.[item]?.name}</span>
          <span className="light-silver">10 produtos</span>
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
