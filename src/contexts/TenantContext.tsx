import React, { FC, useEffect, useReducer } from 'react'
import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore'

import { createCtx, log, sanitizeForFirebase } from '../utils'
import {
  TenantConfig,
  TenantContextState,
  Product,
  Category,
  ShippingStrategies,
  OpeningHours,
  PaymentMethod,
  WorldAddress,
} from '../typings'
import { tenantStateReducer, TenantContextActions } from './tenantReducer'
import { AltMessage, altMessage } from '../intlConfig'

type Props = {
  slug?: string
  tenantId?: string
}

type Dispatch = (action: TenantContextActions) => void

export const [useTenantConfig, TenantStateProvider] = createCtx<
  TenantContextState
>()
export const [useTenantDispatch, TenantDispatchProvider] = createCtx<Dispatch>()

export const useTenant = () =>
  [useTenantConfig(), useTenantDispatch()] as [TenantContextState, Dispatch]

export const tenantsRef = (db: firestore.Firestore) => db.collection('tenants')

export const tenantRef = (db: firestore.Firestore, tenantId: string) =>
  tenantsRef(db).doc(tenantId)

export const productsRef = (db: firestore.Firestore, tenantId: string) =>
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

  /**
   *  UGLY CODE ALERT
   *
   *  This piece of code lazily migrate tenant' products from the older way
   *  (inside the tenant) to the new one (with a separate collection).
   *
   *  As soon as we release the new Order page (and, eventually, all tenans migrate)
   *  we should simplify this effect since there will be no need to:
   *    - Use the slug as a way to load a tenant
   *    - Migrate the data
   */
  useEffect(() => {
    if (!slug && !tenantId) {
      return log(`You didn't provide valid data for us to fetch the Tenant`)
    }

    dispatch({ type: 'START_LOADING' })
    dispatch({ type: 'PRODUCT_START_LOADING' })
    const db = firebase.firestore()
    const tenantQuery = tenantId
      ? tenantRef(db, tenantId)
          .get()
          .then((doc) => ({
            tenant: doc.data() as TenantConfig,
            docId: doc.id,
          }))
      : tenantsRef(db)
          .where('slug', '==', slug)
          .get()
          .then((snap) => {
            const [doc] = snap.docs

            return { tenant: doc?.data() as TenantConfig, docId: doc.id }
          })

    tenantQuery
      .then(({ tenant, docId }) => {
        dispatch({ type: 'SET_TENANT', args: tenant })
        dispatch({ type: 'SET_TENANT_ID', args: docId })
        const productsQuery = productsRef(db, docId).get()

        return productsQuery
          .then((querySnapshot) => {
            const { docs } = querySnapshot
            const products = docs.map(
              (doc) => ({ ...doc.data(), id: doc.id } as Product)
            )

            // Test some stuff and call migrate
            // But what about the userId? :grr
            dispatch({ type: 'SET_PRODUCTS', args: products })
          })
          .catch((error: unknown) => {
            log('Error fetching products: ', error)
          })
          .finally(() => {
            dispatch({ type: 'PRODUCT_STOP_LOADING' })
          })
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
    address: WorldAddress
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

export const setOperationOptions = async (
  dispatch: Dispatch,
  data: Pick<TenantConfig, 'showOnClose' | 'live'>,
  tenantId?: string
) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  return ref
    .update({
      ...data,
    })
    .then(() => {
      dispatch({ type: 'SET_TENANT_FIELD', args: { ...data } })
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

export const validateSlug = (slug: string, current: string) => {
  const FORBIDDEN = ['admin', 'tenants', 'login', 'index', 'onboard']

  if (FORBIDDEN.includes(slug)) {
    return Promise.reject()
  }

  if (slug === current) {
    return Promise.resolve()
  }

  const db = firebase.firestore()
  const ref = tenantsRef(db)

  return ref
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then((res) => {
      if (res.empty) {
        return Promise.resolve()
      }

      throw new Error('Username already exists')
    })
}

export const addTenant = ({
  tenant,
  userId,
}: {
  tenant: Partial<TenantConfig>
  userId: string
}): Promise<AltMessage> => {
  const { slug } = tenant

  if (!slug || !userId) {
    return Promise.reject(altMessage('onboard.tenant.error'))
  }

  const db = firebase.firestore()
  const ref = tenantsRef(db)

  const data = sanitizeForFirebase({
    userId,
    createdAt: new Date().toISOString(),
    migrated: true,
    ...tenant,
  })

  return validateSlug(slug, '')
    .then(() => {
      return ref
        .add(data)
        .then(() => {
          return altMessage('onboard.tenantSuccess')
        })
        .catch((err) => {
          log(err)

          return Promise.reject(altMessage('onboard.tenant.error'))
        })
    })
    .catch(() => {
      return Promise.reject(altMessage('onboard.tenant.slugError'))
    })
}

export const MIGRATE_TENANT = async (
  dispatch: Dispatch,
  {
    tenantId,
    tenant,
    userId,
  }: {
    tenantId: string
    tenant: TenantConfig
    userId: string
  }
) => {
  const db = firebase.firestore()

  const ref = tenantRef(db, tenantId)

  ref.get().then(async (doc) => {
    const tenantDb = doc.data()

    if (tenantDb?.migrated) {
      return
    }

    ref.update({ migrated: true })
    await addCategory(dispatch, {
      category: {
        name: 'Principal',
        live: true,
        slug: 'principal',
      },
      tenantId,
      firstCategory: true,
    })

    await Promise.all(
      tenant.items.map(({ items, headline, ...oldProduct }) =>
        addProduct(dispatch, {
          tenantId,
          product: {
            ...oldProduct,
            description: items ? items.join('\n\n') : '',
            highlight: false,
            category: 0,
            userId,
          },
        })
      )
    )
  })
}

/**
 * Completely deletes a product from the Database.
 *
 * Beware that, later, we'll be referencing products outside (menus or collections),
 * and need to be sure that this won't crash anything
 */
export const deleteProduct = (
  dispatch: Dispatch,
  { productId, tenantId }: { productId?: string; tenantId?: string }
) => {
  dispatch({ type: 'PRODUCT_START_LOADING' })

  if (!tenantId || !productId) {
    dispatch({ type: 'PRODUCT_START_LOADING' })

    return Promise.reject()
  }

  const db = firebase.firestore()
  const ref = productsRef(db, tenantId).doc(productId)

  return ref
    .delete()
    .then(() => {
      dispatch({ type: 'DELETE_PRODUCT', args: productId })
    })
    .finally(() => {
      dispatch({ type: 'PRODUCT_STOP_LOADING' })
    })
}
