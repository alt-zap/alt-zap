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
  Section,
  Sites,
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

            if (!tenant.sites) {
              // Not awaiting here with purpose
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              configureInitialSiteSetup(dispatch, {
                tenant,
                products,
                tenantId: docId,
              })
            }

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

      return doc.id
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
  const FORBIDDEN = [
    'app',
    'docs',
    'www',
    'sobre',
    'quero-contibuir',
    'contato',
    'como-funciona',
    'admin',
    'tenants',
    'login',
    'index',
    'onboard',
  ]

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
        }).then((productId) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          return reconcileSections(dispatch, {
            tenantId,
            currentSites: {
              zap: {
                categoryIds: [{ visible: true, element: 0 }],
                productMap: {
                  0: [],
                },
              },
            },
            action: {
              type: 'PRODUCT_ADDED',
              args: {
                productId,
                categoryId: 0,
              },
            },
          })
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

/**
 * Here begun the first challenge of state sync on Alt
 *
 * Cases we need to take care of:
 * - Product added => Add the product.id to productsMap[product.category]
 * - Product removed => Remove the product.id from productsMap[product.category]
 * - Category added => Add the category index to categoryIds && set [] as productsMap[category.id]
 * - Category removed => Remove the category index from categoryIds && delete productsMap[category.id]
 */

type UpdateAction =
  | { type: 'PRODUCT_ADDED'; args: { productId: string; categoryId: number } }
  | { type: 'PRODUCT_REMOVED'; args: { productId: string; categoryId: number } }
  | { type: 'CATEGORY_ADDED'; args: { categoryId: number } }
  | { type: 'CATEGORY_REMOVED'; args: { categoryId: number } }

const getUpdatesSites = (
  sites: Sites,
  action: UpdateAction
): TenantConfig['sites'] => {
  switch (action.type) {
    case 'CATEGORY_ADDED': {
      const { categoryId } = action.args

      return {
        zap: {
          productMap: {
            ...sites?.zap.productMap,
            [categoryId]: [],
          },
          categoryIds: [
            ...sites.zap.categoryIds,
            { element: categoryId, visible: true },
          ],
        },
      }
    }

    case 'CATEGORY_REMOVED': {
      const { categoryId } = action.args

      const sitesClone = JSON.parse(JSON.stringify(sites)) as Sites

      delete sitesClone.zap.productMap[categoryId]

      return {
        zap: {
          productMap: sitesClone.zap.productMap,
          categoryIds: sitesClone.zap.categoryIds.filter(
            ({ element }) => element === categoryId
          ),
        },
      }
    }

    case 'PRODUCT_ADDED': {
      const { productId, categoryId } = action.args

      return {
        zap: {
          ...sites.zap,
          productMap: {
            ...sites.zap.productMap,
            [categoryId]: [
              ...sites.zap.productMap[categoryId],
              { element: productId, visible: true },
            ],
          },
        },
      }
    }

    case 'PRODUCT_REMOVED': {
      const { productId, categoryId } = action.args

      return {
        zap: {
          ...sites.zap,
          productMap: {
            ...sites.zap.productMap,
            [categoryId]: sites.zap.productMap[categoryId].filter(
              ({ element }) => element === productId
            ),
          },
        },
      }
    }

    default:
  }
}

export const reconcileSections = async (
  dispatch: Dispatch,
  {
    tenantId,
    currentSites,
    action,
  }: { action: UpdateAction; tenantId?: string; currentSites: Sites }
) => {
  const { zap } = currentSites

  const newSites = getUpdatesSites(currentSites, action)

  if (!zap || !tenantId || !newSites) {
    return
  }

  await setTenantData(dispatch, { tenantData: { sites: newSites }, tenantId })
}

export function getSectionsFromIds<T>(list: T[]): Array<Section<T>> {
  return list.map((element) => ({ element, visible: true }))
}

export const configureInitialSiteSetup = async (
  dispatch: Dispatch,
  {
    tenant,
    products,
    tenantId,
  }: { tenant: TenantConfig; products: Product[]; tenantId: string }
) => {
  if (!tenant?.categories || !products) {
    return
  }

  const categoryIds = getSectionsFromIds(tenant.categories.map((_, i) => i))

  const productMap = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }

    acc[product.category].push({ visible: true, element: product.id as string })

    return acc
  }, {} as Record<number, Array<Section<string>>>)

  const initialSites: TenantConfig['sites'] = {
    zap: {
      categoryIds,
      productMap,
    },
  }

  await setTenantData(dispatch, {
    tenantId,
    tenantData: {
      sites: initialSites,
    },
  })
}
