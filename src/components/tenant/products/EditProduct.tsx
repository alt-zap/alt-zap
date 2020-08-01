import React, { FC } from 'react'

import ProductForm from './ProductForm'
import { useTenantConfig } from '../../../contexts/TenantContext'

type Props = {
  product: Partial<Product>
  onFinish: () => void
}

const EditProduct: FC<Props> = ({ product }) => {
  const { productsLoading } = useTenantConfig()

  return (
    <ProductForm
      editMode
      // eslint-disable-next-line no-console
      onValidSubmit={(data) => console.log(data)}
      initialData={product}
      loading={productsLoading}
    />
  )
}

export default EditProduct
