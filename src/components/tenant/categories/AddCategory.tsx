import React, { FC, useCallback } from 'react'
import { message } from 'antd'

import CategoryForm from './CategoryForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = { onFinish: () => void }

const AddCategory: FC<Props> = ({ onFinish }) => {
  const { categoryLoading, addCategory } = useTenantConfig()

  const createCategory = useCallback(
    (data: Category) => {
      addCategory(data).then(() => {
        onFinish()
        message.success('Categoria cadastrada com sucesso')
      })
    },
    [onFinish, addCategory]
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
