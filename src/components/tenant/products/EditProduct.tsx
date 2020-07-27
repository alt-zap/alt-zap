import React, { FC } from 'react'

import ProductForm from './ProductForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = {
  product: Partial<Product>
  onFinish: () => void
}

const EditProduct: FC<Props> = ({ product }) => {
  const { editProduct, categoriesLoading } = useTenantConfig()

  return (
    <ProductForm
      editMode
      onValidSubmit={(data) => editProduct(data as Product)}
      initialData={product}
      loading={categoriesLoading}
    />
  )
}

export default EditProduct
