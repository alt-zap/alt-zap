import React, { FC, useEffect, useState, useCallback } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { createCtx, log, Element } from '../utils'

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
  // TODO: This prop is being used for two things. Not ideal.
  categoriesLoading?: boolean
  editCategory: (category: Category) => void
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

  return (
    <TenantProvider
      value={{
        loading,
        tenantId: id,
        tenant,
        updateTenant: setTenant,
        editCategory,
      }}
    >
      {children}
    </TenantProvider>
  )
}
