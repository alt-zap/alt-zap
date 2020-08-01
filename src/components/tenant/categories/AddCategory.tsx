import React, { FC, useCallback } from 'react'
import { message } from 'antd'

import CategoryForm from './CategoryForm'
import {
  useTenantConfig,
  useTenantDispatch,
  addCategory,
  isCategoryUnique,
} from '../../../contexts/TenantContext'
import { Category } from '../../../typings'

type Props = { onFinish: () => void }

const AddCategory: FC<Props> = ({ onFinish }) => {
  const { categoryLoading, tenantId, tenant } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const createCategory = useCallback(
    (category: Category) => {
      if (!tenantId || !tenant) {
        return
      }

      const { categories } = tenant

      if (!isCategoryUnique(category.slug, categories)) {
        message.error(`Já existe uma categoria "${category.name}".`)
      }

      addCategory(dispatch, {
        category,
        tenantId,
        firstCategory: !categories || !categories.length,
      }).then(() => {
        onFinish()
        message.success('Categoria cadastrada com sucesso')
      })
    },
    [onFinish, dispatch, tenant, tenantId]
  )

  return (
    <CategoryForm
      initialData={{
        live: true,
      }}
      onValidSubmit={createCategory}
      loading={categoryLoading}
    />
  )
}

export default AddCategory
