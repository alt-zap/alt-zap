import React from 'react'

import SortCategories from '../tenant/sites/SortCategories'
import WithAltburguer from './withAltburguer'

export default {
  title: 'tenant|SortCategories',
  component: SortCategories,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const initial = () => (
  <WithAltburguer>
    <SortCategories />
  </WithAltburguer>
)
