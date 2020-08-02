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
import { useAltIntl } from '../../../intlConfig'

type Props = {
  category: Partial<Category>
  index: number
  onFinish: () => void
}

const EditCategory: FC<Props> = ({ category, index, onFinish }) => {
  const intl = useAltIntl()
  const { categoryLoading, tenant, tenantId } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const handleEditCategory = useCallback(
    (editedCategory: Category) => {
      if (!tenantId || !tenant) {
        return
      }

      const { categories } = tenant

      if (!isCategoryUnique(editedCategory.slug, categories)) {
        message.error(
          intl.formatMessage(
            { id: 'tenant.categories.alreadyExists' },
            {
              name: editedCategory.name,
            }
          )
        )
      }

      editCategory(dispatch, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        categories: categories!,
        category: editedCategory,
        index,
        tenantId,
      }).then(() => {
        onFinish()
        message.success(
          intl.formatMessage({ id: 'tenant.categories.editSuccess' })
        )
      })
    },
    [dispatch, tenant, tenantId, index, onFinish, intl]
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
