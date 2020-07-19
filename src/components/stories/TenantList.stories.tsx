import React from 'react'

import TenantList from '../tenant/TenantList'

export default {
  title: 'common|TenantList',
  component: TenantList,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const One = () => (
  <TenantList
    tenants={[
      {
        name: 'Alt Burger CG',
        slug: 'altburger-cg',
        items: [
          {
            name: '',
            price: 1230,
            live: true,
          },
        ],
      },
    ]}
  />
)
export const Two = () => (
  <TenantList
    tenants={[
      {
        name: 'Cavalcantes Burger',
        slug: 'cavalcantes-burguer',
        items: [
          {
            name: '',
            price: 1230,
            live: true,
          },
        ],
      },
      {
        name: 'Alt Burger CG',
        slug: 'altburger-cg',
        items: [
          {
            name: '',
            price: 1230,
            live: true,
          },
        ],
      },
    ]}
  />
)
