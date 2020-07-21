import React, { FC } from 'react'

import ProductForm from './ProductForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = {
  category: Partial<Product>
  onFinish: () => void
}

const EditProduct: FC<Props> = ({ category }) => {
  const { editProduct, categoriesLoading } = useTenantConfig()

  return (
    <ProductForm
      editMode
      onValidSubmit={(data) => editProduct(data)}
      initialData={category}
      loading={categoriesLoading}
    />
  )
}

export default EditProduct
