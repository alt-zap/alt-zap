import React, { FC, useEffect, useReducer } from 'react'
import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore'

import { createCtx, log, sanitizeForFirebase } from '../utils'
import {
  TenantConfig,
  TenantContextState,
  TenantContextActions,
  Product,
  Category,
  ShippingStrategies,
  OpeningHours,
  PaymentMethod,
} from '../typings'
import { tenantStateReducer } from './tenantReducer'

type Props = {
  slug?: string
  tenantId?: string
}

type Dispatch = (action: TenantContextActions) => void

export const [useTenantConfig, TenantStateProvider] = createCtx<
  TenantContextState
>()
export const [useTenantDispatch, TenantDispatchProvider] = createCtx<Dispatch>()

const tenantRef = (db: firestore.Firestore, tenantId: string) =>
  db.collection('tenants').doc(tenantId)

const productsRef = (db: firestore.Firestore, tenantId: string) =>
  tenantRef(db, tenantId).collection('products')

export const TenantContextProvider: FC<Props> = ({
  slug,
  tenantId,
  children,
}) => {
  const [state, dispatch] = useReducer(tenantStateReducer, {
    loading: true,
    tenantId,
  })

  useEffect(() => {
    if (!tenantId) return

    dispatch({ type: 'PRODUCT_START_LOADING' })
    const db = firebase.firestore()
    const query = productsRef(db, tenantId).get()

    query
      .then((querySnapshot) => {
        const { docs } = querySnapshot
        const products = docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as Product)
        )

        dispatch({ type: 'SET_PRODUCTS', args: products })
      })
      .catch((error: unknown) => {
        log('Error fetching products: ', error)
      })
      .finally(() => {
        dispatch({ type: 'PRODUCT_STOP_LOADING' })
      })
  }, [tenantId])

  useEffect(() => {
    if (!tenantId) return

    if (slug) {
      return log(
        `We no longer support slug querying for the TenantContext. Please, move away from the old Order Page!`
      )
    }

    dispatch({ type: 'START_LOADING' })
    const db = firebase.firestore()
    const query = tenantRef(db, tenantId).get()

    query
      .then((querySnapshot) => {
        const data = querySnapshot.data() as TenantConfig

        dispatch({ type: 'SET_TENANT', args: data })
      })
      .catch((error: unknown) => {
        log('Error fetching Tenant data: ', error)
      })
      .finally(() => {
        dispatch({ type: 'STOP_LOADING' })
      })
  }, [slug, tenantId])

  return (
    <TenantStateProvider value={state}>
      <TenantDispatchProvider value={dispatch}>
        {children}
      </TenantDispatchProvider>
    </TenantStateProvider>
  )
}

export const countProductPerCategory = (
  categoryIndex: number,
  products: Product[]
) => {
  return products.filter(({ category }) => category === categoryIndex).length
}

export const isCategoryUnique = (
  categorySlug: string,
  categories?: Category[]
) => !categories?.some(({ slug }) => slug === categorySlug)

export const editCategory = async (
  dispatch: Dispatch,
  {
    category,
    categories,
    index,
    tenantId,
  }: {
    category: Category
    categories: Category[]
    tenantId: string
    index: number
  }
) => {
  if (!tenantId) {
    return Promise.reject()
  }

  dispatch({ type: 'CATEGORY_START_LOADING' })

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  const newCategories = [...categories]

  newCategories[index] = category

  return ref
    .update({
      categories: newCategories,
    })
    .then(() => {
      dispatch({
        type: 'EDIT_CATEGORY',
        args: {
          categoryData: category,
          index,
        },
      })
    })
    .finally(() => {
      dispatch({ type: 'CATEGORY_STOP_LOADING' })
    })
}

export const addCategory = async (
  dispatch: Dispatch,
  {
    category,
    tenantId,
    firstCategory,
  }: {
    category: Category
    tenantId?: string
    firstCategory?: boolean
  }
) => {
  if (!tenantId) {
    return Promise.reject()
  }

  dispatch({ type: 'CATEGORY_START_LOADING' })

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  const toAdd = !firstCategory
    ? firebase.firestore.FieldValue.arrayUnion(category)
    : [category]

  return ref
    .update({
      categories: toAdd,
    })
    .then(() => {
      dispatch({ type: 'ADD_CATEGORY', args: category })
    })
    .finally(() => {
      dispatch({ type: 'CATEGORY_STOP_LOADING' })
    })
}

export const addProduct = async (
  dispatch: Dispatch,
  {
    product,
    tenantId,
  }: {
    product: Product
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject()
  }

  const db = firebase.firestore()
  const ref = productsRef(db, tenantId)

  return ref
    .add(sanitizeForFirebase(product))
    .then((doc) => {
      dispatch({ type: 'ADD_PRODUCT', args: { ...product, id: doc.id } })
    })
    .finally(() => {
      dispatch({ type: 'PRODUCT_STOP_LOADING' })
    })
}

export const editProduct = async (
  dispatch: Dispatch,
  {
    product,
    tenantId,
  }: {
    product: Product
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject('You should inform the tenantId')
  }

  if (!product.id) {
    return Promise.reject('O produto informado não contém ID')
  }

  dispatch({ type: 'PRODUCT_START_LOADING' })

  const db = firebase.firestore()
  const ref = productsRef(db, tenantId).doc(product.id)

  const { id, ...productData } = product

  return ref
    .update(sanitizeForFirebase(productData))
    .then(() => {
      dispatch({
        type: 'EDIT_PRODUCT',
        args: product,
      })
    })
    .finally(() => {
      dispatch({ type: 'PRODUCT_STOP_LOADING' })
    })
}

export const setAddress = async (
  dispatch: Dispatch,
  {
    address,
    tenantId,
  }: {
    address: Address
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  return ref
    .update({
      address: sanitizeForFirebase(address),
    })
    .then(() => {
      dispatch({ type: 'SET_ADDRESS', args: address })
    })
}

export const setShippingStrategies = async (
  dispatch: Dispatch,
  {
    shippingStrategies,
    tenantId,
  }: {
    shippingStrategies: ShippingStrategies
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  return ref
    .update({
      shippingStrategies: sanitizeForFirebase(shippingStrategies),
    })
    .then(() => {
      dispatch({ type: 'SET_SHIPPING', args: shippingStrategies })
    })
}

export const setOpeningHours = async (
  dispatch: Dispatch,
  {
    openingHours,
    tenantId,
  }: {
    openingHours: OpeningHours
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  return ref
    .update({
      openingHours: sanitizeForFirebase(openingHours),
    })
    .then(() => {
      dispatch({ type: 'SET_TENANT_FIELD', args: { openingHours } })
    })
}

export const setPaymentMethods = async (
  dispatch: Dispatch,
  {
    paymentMethods,
    tenantId,
  }: {
    paymentMethods: PaymentMethod[]
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  return ref
    .update({
      paymentMethods: sanitizeForFirebase(paymentMethods),
    })
    .then(() => {
      dispatch({ type: 'SET_TENANT_FIELD', args: { paymentMethods } })
    })
}

export const setTenantData = async (
  dispatch: Dispatch,
  {
    tenantData,
    tenantId,
  }: {
    tenantData: Partial<TenantConfig>
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  const metadata = sanitizeForFirebase(tenantData)

  return ref
    .update({
      ...metadata,
    })
    .then(() => {
      dispatch({ type: 'SET_TENANT_FIELD', args: { ...metadata } })
    })
}
