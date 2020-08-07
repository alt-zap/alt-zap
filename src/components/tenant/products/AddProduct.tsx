import React, { FC, useCallback } from 'react'
import { Alert } from 'antd'

import ProductForm from './ProductForm'
import {
  useTenantConfig,
  useTenantDispatch,
  addProduct,
} from '../../../contexts/TenantContext'
import { Product } from '../../../typings'
import { Message } from '../../../intlConfig'

type Props = { onFinish: () => void }

const AddProduct: FC<Props> = ({ onFinish }) => {
  const { productsLoading, tenantId, tenant } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const createProduct = useCallback(
    (product: Product) => {
      const addPromise = addProduct(dispatch, {
        product,
        tenantId,
      })

      return addPromise.then(() => {
        onFinish()
      })
    },
    [onFinish, dispatch, tenantId]
  )

  if (!tenant?.categories) {
    return (
      <Alert
        type="warning"
        message={<Message id="tenant.product.shouldAddCategory" />}
      />
    )
  }

  return (
    <ProductForm
      initialData={{
        live: true,
      }}
      categories={tenant?.categories}
      onValidSubmit={createProduct}
      loading={productsLoading}
    />
  )
}

export default AddProduct
