import React, { FC, useEffect, useReducer } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { createCtx, log, sanitizeForFirebase } from '../utils'
import {
  TenantConfig,
  TenantContextState,
  TenantContextActions as Actions,
  TenantContextActions,
  Product,
  Category,
} from '../typings'

type Props = {
  slug?: string
  tenantId?: string
}

const tenantStateReducer = (
  state: TenantContextState,
  action: Actions
): TenantContextState => {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      const category = action.args || {}

      const current = state.tenant?.categories

      return {
        ...state,
        tenant: {
          ...(state.tenant as TenantConfig),
          categories: current ? [...current, category] : [category],
        },
      }
    }

    case 'EDIT_CATEGORY': {
      const { categoryData, index } = action.args || {}

      const newCategories = [...(state.tenant?.categories as Category[])]

      newCategories[index] = categoryData

      return {
        ...state,
        tenant: {
          ...(state.tenant as TenantConfig),
          categories: newCategories,
        },
      }
    }

    case 'ADD_PRODUCT': {
      const product = action.args || {}

      const current = state.products

      return {
        ...state,
        products: current ? [...current, product] : [product],
      }
    }

    case 'SET_PRODUCTS': {
      const products = action.args || {}

      return {
        ...state,
        products,
      }
    }

    case 'PRODUCT_START_LOADING': {
      return {
        ...state,
        productsLoading: true,
      }
    }

    case 'PRODUCT_STOP_LOADING': {
      return {
        ...state,
        productsLoading: false,
      }
    }

    case 'CATEGORY_START_LOADING': {
      return {
        ...state,
        categoryLoading: true,
      }
    }

    case 'CATEGORY_STOP_LOADING': {
      return {
        ...state,
        categoryLoading: false,
      }
    }

    case 'START_LOADING': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'STOP_LOADING': {
      return {
        ...state,
        loading: false,
      }
    }

    case 'SET_TENANT': {
      const tenant = action.args || {}

      return {
        ...state,
        tenant,
      }
    }

    default: {
      return state
    }
  }
}

type Dispatch = (action: TenantContextActions) => void

export const [useTenantConfig, TenantStateProvider] = createCtx<
  TenantContextState
>()
export const [useTenantDispatch, TenantDispatchProvider] = createCtx<Dispatch>()

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
    const query = db
      .collection('tenants')
      .doc(tenantId)
      .collection('products')
      .get()

    query
      .then((querySnapshot) => {
        const { docs } = querySnapshot
        const products = docs.map((doc) => doc.data() as Product)

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
    const query = db.collection('tenants').doc(tenantId).get()

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
  const ref = db.collection('tenants').doc(tenantId)

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
  const ref = db.collection('tenants').doc(tenantId)

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
  const ref = db.collection('tenants').doc(tenantId).collection('products')

  return ref
    .add(sanitizeForFirebase(product))
    .then(() => {
      dispatch({ type: 'ADD_PRODUCT', args: product })
    })
    .finally(() => {
      dispatch({ type: 'PRODUCT_STOP_LOADING' })
    })
}
