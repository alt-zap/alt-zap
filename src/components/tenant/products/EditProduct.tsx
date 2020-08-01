import React, { FC } from 'react'
import { Alert } from 'antd'

import ProductForm from './ProductForm'
import { useTenantConfig } from '../../../contexts/TenantContext'
import { Product } from '../../../typings'

type Props = {
  product: Product
  // Probably need some id here
  onFinish: () => void
}

const EditProduct: FC<Props> = ({ product }) => {
  const { productsLoading, tenant } = useTenantConfig()

  if (!tenant?.categories) {
    return (
      <Alert type="warning" message="Você deve ter categorias cadastradas" />
    )
  }

  return (
    <ProductForm
      editMode
      categories={tenant.categories}
      // eslint-disable-next-line no-console
      onValidSubmit={(data) => console.log(data)}
      initialData={product}
      loading={productsLoading}
    />
  )
}

export default EditProduct
