import React, { FC, useEffect, useState, useCallback, useMemo } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { createCtx, log, Element } from '../utils'
import { TenantConfig } from '../typings'

type Props = {
  slug?: string
  tenantId?: string
}

interface CategoriesCollection
  extends Element<Element<TenantConfig['menus']>['categories']> {
  id: string
}

type ContextProps = {
  loading: boolean
  tenantId?: string
  tenant?: TenantConfig
  categories?: CategoriesCollection[]
  categoryLoading?: boolean
  editCategory: (category: Category) => void
  addCategory: (category: Category) => Promise<void>
  isCategoryUnique: (slug: string) => boolean
  products?: Product[]
  // TODO: This prop is being used for two things. Not ideal.
  productsLoading?: boolean
  editProduct: (product: Product) => void
  addProduct: (product: Product) => void
  updateTenant: (data: TenantConfig) => void
}

export const [useTenantConfig, TenantProvider] = createCtx<ContextProps>()

export const TenantContextProvider: FC<Props> = ({
  slug,
  tenantId,
  children,
}) => {
  const [tenant, setTenant] = useState<TenantConfig>()
  const [id, setId] = useState(tenantId)
  const [loading, setLoading] = useState(true)
  const [categoryLoading, setCategoryLoading] = useState(false)

  useEffect(() => {
    if (!slug && !tenantId) return
    const db = firebase.firestore()
    const query = tenantId
      ? () => db.collection('tenants').doc(tenantId).get()
      : () => db.collection('tenants').where('slug', '==', slug).get()

    query()
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((querySnapshot: any) => {
        const [doc] = querySnapshot.docs || [querySnapshot]
        const data = doc.data()

        setId(doc.id)
        setTenant(data)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        log('Error getting documents: ', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug, tenantId])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editCategory = useCallback((category: Category) => {}, [])

  const addCategory = useCallback(
    (category: Category) => {
      if (!tenant) {
        return Promise.reject()
      }

      setCategoryLoading(true)

      const db = firebase.firestore()
      const ref = db.collection('tenants').doc(tenantId)

      const toAdd = tenant?.categories
        ? firebase.firestore.FieldValue.arrayUnion(category)
        : [category]

      return ref
        .update({
          categories: toAdd,
        })
        .then(() => {
          const { categories: current } = tenant

          // Adding newly-added category to local array
          setTenant({
            ...tenant,
            categories: current ? [...current, category] : [category],
          })
        })
        .finally(() => {
          setCategoryLoading(false)
        })
    },
    [tenantId, tenant]
  )

  const categoriesList = useMemo(
    () => tenant?.menus?.[0]?.categories?.map(({ slug: s }) => s),
    [tenant]
  )

  const isCategoryUnique = useCallback(
    (categorySlug: string) => !categoriesList?.includes(categorySlug),
    [categoriesList]
  )

  return (
    <TenantProvider
      value={{
        loading,
        tenantId: id,
        tenant,
        updateTenant: setTenant,
        editCategory,
        isCategoryUnique,
        categoryLoading,
        addCategory,
        editProduct: () => {},
        addProduct: () => {},
      }}
    >
      {children}
    </TenantProvider>
  )
}
