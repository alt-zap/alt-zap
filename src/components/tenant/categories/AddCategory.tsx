import React, { FC, useCallback } from 'react'

import CategoryForm from './CategoryForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = { onFinish: () => void }

const AddCategory: FC<Props> = ({ onFinish }) => {
  const { categoriesLoading } = useTenantConfig()

  const createCategory = useCallback(
    (data: Partial<Category>) => {
      // TODO: Use the Tenant's function
      Promise.resolve(data).then(() => {
        onFinish()
      })
    },
    [onFinish]
  )

  return (
    <CategoryForm onValidSubmit={createCategory} loading={categoriesLoading} />
  )
}

export default AddCategory
