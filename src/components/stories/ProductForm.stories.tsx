/* eslint-disable no-console */
import React from 'react'

import ProductForm from '../tenant/products/ProductForm'
import { TenantStateProvider } from '../../contexts/TenantContext'
import withIntl from './withIntl'

export default {
  title: 'tenant|ProductForm',
  component: ProductForm,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withIntl],
}
const exampleCategories = [
  {
    id: '1',
    name: 'Principal',
    slug: 'principal',
    live: true,
  },
  {
    id: '2',
    name: 'Hamburgueres',
    slug: 'hamburgueres',
    live: true,
  },
]

export const classic = () => (
  <TenantStateProvider
    value={{
      categories: exampleCategories,
      loading: false,
    }}
  >
    <ProductForm
      categories={[]}
      onValidSubmit={(a) => Promise.resolve(console.log(a))}
    />
  </TenantStateProvider>
)

export const withData = () => (
  <TenantStateProvider
    value={{
      loading: false,
      categories: exampleCategories,
    }}
  >
    <ProductForm
      onValidSubmit={(a) => Promise.resolve(console.log(a))}
      categories={[]}
    />
  </TenantStateProvider>
)
