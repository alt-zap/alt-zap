import React from 'react'

import TenantDashboard from '../tenant/TenantDashboard'
import { TenantProvider } from '../../contexts/TenantContext'

export default {
  title: 'tenant|TenantDashboard',
  component: TenantDashboard,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

const exampleTenant = {
  name: 'Alt Burger CG',
  slug: 'altburger-cg',
  live: true,
  menus: [
    {
      name: 'Principal',
      slug: 'main',
    },
  ],
}

const exampleCategories = [
  {
    id: '1',
    name: 'Principal',
    slug: 'principal',
    live: true,
    products: [
      {
        name: '',
        highlight: false,
        price: 1230,
        live: false,
      },
      {
        name: '',
        highlight: false,
        price: 1230,
        live: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Hamburgueres',
    slug: 'hamburgueres',
    live: true,
    products: [
      {
        name: '',
        highlight: false,
        price: 1230,
        live: false,
      },
      {
        name: '',
        highlight: false,
        price: 1230,
        live: false,
      },
    ],
  },
]

export const Active = () => (
  <TenantProvider
    value={{
      tenant: (exampleTenant as unknown) as TenantConfig,
      categories: exampleCategories,
      loading: false,
      updateTenant: () => {},
    }}
  >
    <TenantDashboard />
  </TenantProvider>
)

export const Loading = () => (
  <TenantProvider
    value={{
      tenant: (exampleTenant as unknown) as TenantConfig,
      categoriesLoading: true,
      loading: false,
      updateTenant: () => {},
    }}
  >
    <TenantDashboard />
  </TenantProvider>
)
