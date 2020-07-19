import React from 'react'

import TenantList from '../tenant/TenantList'

export default {
  title: 'common|TenantList',
  component: TenantList,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const One = () => (
  <TenantList
    onSelectTenant={() => {}}
    tenants={[
      {
        id: '',
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
    onSelectTenant={() => {}}
    tenants={[
      {
        id: '2',
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
        id: '3',
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
