import React from 'react'

import TenantDashboard from '../tenant/TenantDashboard'

export default {
  title: 'tenant|TenantDashboard',
  component: TenantDashboard,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const Active = () => (
  <TenantDashboard
    tenant={{
      name: 'Alt Burger CG',
      slug: 'altburger-cg',
      live: true,
      menus: [
        {
          name: 'Principal',
          slug: 'main',
          categories: [
            {
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
          ],
        },
      ],
    }}
  />
)
