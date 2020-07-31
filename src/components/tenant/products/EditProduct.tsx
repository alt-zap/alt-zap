import React, { FC } from 'react'

import ProductForm from './ProductForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = {
  product: Partial<Product>
  onFinish: () => void
}

const EditProduct: FC<Props> = ({ product }) => {
  const { editProduct, productsLoading } = useTenantConfig()

  return (
    <ProductForm
      editMode
      onValidSubmit={(data) => editProduct(data as Product)}
      initialData={product}
      loading={productsLoading}
    />
  )
}

export default EditProduct
