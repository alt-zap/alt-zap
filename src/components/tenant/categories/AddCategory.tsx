import React, { FC, useCallback } from 'react'

import CategoryForm from './CategoryForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = { onFinish: () => void }

const AddCategory: FC<Props> = ({ onFinish }) => {
  const { categoriesLoading, addCategory } = useTenantConfig()

  const createCategory = useCallback(
    (data: Partial<Category>) => {
      addCategory(data).then(() => {
        onFinish()
      })
    },
    [onFinish, addCategory]
  )

  return (
    <CategoryForm onValidSubmit={createCategory} loading={categoriesLoading} />
  )
}

export default AddCategory
