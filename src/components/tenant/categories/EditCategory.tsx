import React, { FC } from 'react'

import CategoryForm from './CategoryForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = {
  category: Partial<Category>
  onFinish: () => void
}

const EditCategory: FC<Props> = ({ category }) => {
  const { editCategory, categoryLoading } = useTenantConfig()

  return (
    <CategoryForm
      editMode
      onValidSubmit={(data) => editCategory(data)}
      initialData={category}
      loading={categoryLoading}
    />
  )
}

export default EditCategory
