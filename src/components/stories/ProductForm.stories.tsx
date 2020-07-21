import React from 'react'

import ProductForm from '../tenant/products/ProductForm'
import { TenantProvider } from '../../contexts/TenantContext'

export default {
  title: 'tenant|ProductForm',
  component: ProductForm,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
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
  <TenantProvider
    value={
      {
        categories: exampleCategories,
      } as any
    }
  >
    <ProductForm />
  </TenantProvider>
)

// export const WithData = () => (
//   <ProductForm
//     initialData={{
//       name: 'Bar do Lucis',
//       slug: 'bardolucis',
//       whatsapp: '+55 (83) 99432-2457',
//       instagram: 'bardolucis',
//       color: '#ff0000',
//     }}
//   />
// )
