import React, { FC, useCallback } from 'react'
import { Alert } from 'antd'

import ProductForm from './ProductForm'
import {
  useTenantConfig,
  useTenantDispatch,
  editProduct,
} from '../../../contexts/TenantContext'
import { Product } from '../../../typings'

type Props = {
  product: Product
  onFinish: () => void
}

const EditProduct: FC<Props> = ({ product, onFinish }) => {
  const { productsLoading, tenant, tenantId } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const handleEditProduct = useCallback(
    (editedProduct: Product) => {
      const editPromise = editProduct(dispatch, {
        product: {
          ...editedProduct,
          id: product.id,
        },
        tenantId,
      })

      editPromise.then(() => {
        onFinish()
      })
    },
    [tenantId, dispatch, onFinish, product]
  )

  if (!tenant?.categories) {
    return (
      <Alert type="warning" message="Você deve ter categorias cadastradas" />
    )
  }

  return (
    <ProductForm
      editMode
      categories={tenant.categories}
      onValidSubmit={handleEditProduct}
      initialData={product}
      loading={productsLoading}
    />
  )
}

export default EditProduct
