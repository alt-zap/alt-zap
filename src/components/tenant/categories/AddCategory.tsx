import React, { FC, useCallback } from 'react'
import { message } from 'antd'

import CategoryForm from './CategoryForm'
import {
  useTenantConfig,
  useTenantDispatch,
  addCategory,
  isCategoryUnique,
  reconcileSections,
} from '../../../contexts/TenantContext'
import { Category, Sites } from '../../../typings'
import { useAltIntl } from '../../../intlConfig'

type Props = { onFinish: () => void }

const AddCategory: FC<Props> = ({ onFinish }) => {
  const intl = useAltIntl()
  const { categoryLoading, tenantId, tenant } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const createCategory = useCallback(
    (category: Category) => {
      if (!tenantId || !tenant) {
        return
      }

      const { categories } = tenant

      if (!isCategoryUnique(category.slug, categories)) {
        message.error(
          intl.formatMessage(
            { id: 'tenant.categories.alreadyExists' },
            {
              name: category.name,
            }
          )
        )
      }

      addCategory(dispatch, {
        category,
        tenantId,
        firstCategory: !categories || !categories.length,
      }).then(() => {
        onFinish()
        message.success(
          intl.formatMessage({ id: 'tenant.categories.addSuccess' })
        )
        reconcileSections(dispatch, {
          tenantId,
          currentSites: tenant?.sites as Sites,
          action: {
            type: 'CATEGORY_ADDED',
            args: {
              categoryId: categories?.length ?? 0,
            },
          },
        })
      })
    },
    [onFinish, dispatch, tenant, tenantId, intl]
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
