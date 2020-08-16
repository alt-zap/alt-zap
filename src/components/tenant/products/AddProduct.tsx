import React, { FC, useCallback } from 'react'
import { Alert } from 'antd'

import ProductForm from './ProductForm'
import {
  useTenantConfig,
  useTenantDispatch,
  addProduct,
} from '../../../contexts/TenantContext'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { Product } from '../../../typings'
import { Message } from '../../../intlConfig'

type Props = { onFinish: () => void }

const AddProduct: FC<Props> = ({ onFinish }) => {
  const [{ user }] = useAuth()
  const { productsLoading, tenantId, tenant } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const createProduct = useCallback(
    (product: Product) => {
      const addPromise = addProduct(dispatch, {
        product: { ...product, userId: user!.uid },
        tenantId,
      })

      return addPromise.then(() => {
        onFinish()
      })
    },
    [onFinish, dispatch, tenantId, user]
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
