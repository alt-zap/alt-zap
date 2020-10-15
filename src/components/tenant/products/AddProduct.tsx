import React, { FC, useCallback, useState } from 'react'
import { Alert } from 'antd'

import ProductForm from './ProductForm'
import {
  useTenantConfig,
  useTenantDispatch,
  addProduct,
  reconcileSections,
} from '../../../contexts/TenantContext'
import { useAuth } from '../../../contexts/auth/AuthContext'
import { Product, Sites } from '../../../typings'
import { Message } from '../../../intlConfig'

type Props = { onFinish: () => void }

const AddProduct: FC<Props> = ({ onFinish }) => {
  const [loading, setLoading] = useState(false)
  const [{ user }] = useAuth()
  const { tenantId, tenant } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const createProduct = useCallback(
    (product: Product) => {
      setLoading(true)
      const addPromise = addProduct(dispatch, {
        product: { ...product, userId: user?.uid as string },
        tenantId,
      })

      return addPromise
        .then((productId) => {
          onFinish()
          reconcileSections(dispatch, {
            tenantId,
            currentSites: tenant?.sites as Sites,
            action: {
              type: 'PRODUCT_ADDED',
              args: {
                productId,
                categoryId: product.category,
              },
            },
          })
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [onFinish, dispatch, tenantId, user, tenant]
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
      loading={loading}
    />
  )
}

export default AddProduct
