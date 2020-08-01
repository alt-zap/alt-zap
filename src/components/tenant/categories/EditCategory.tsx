import React, { FC, useCallback } from 'react'
import { message } from 'antd'

import CategoryForm from './CategoryForm'
import {
  useTenantConfig,
  useTenantDispatch,
  isCategoryUnique,
  editCategory,
} from '../../../contexts/TenantContext'
import { Category } from '../../../typings'

type Props = {
  category: Partial<Category>
  index: number
  onFinish: () => void
}

const EditCategory: FC<Props> = ({ category, index, onFinish }) => {
  const { categoryLoading, tenant, tenantId } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const handleEditCategory = useCallback(
    (editedCategory: Category) => {
      if (!tenantId || !tenant) {
        return
      }

      const { categories } = tenant

      if (!isCategoryUnique(editedCategory.slug, categories)) {
        message.error(`Já existe uma categoria "${editedCategory.name}".`)
      }

      editCategory(dispatch, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        categories: categories!,
        category: editedCategory,
        index,
        tenantId,
      }).then(() => {
        onFinish()
        message.success('Categoria cadastrada com sucesso')
      })
    },
    [dispatch, tenant, tenantId, index, onFinish]
  )

  return (
    <CategoryForm
      editMode
      onValidSubmit={(data) => handleEditCategory(data)}
      initialData={category}
      loading={categoryLoading}
    />
  )
}

export default EditCategory
