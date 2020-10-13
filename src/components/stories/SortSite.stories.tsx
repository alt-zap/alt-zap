import React from 'react'

import SortSite from '../tenant/sites/cms/SortSite'
import WithAltburguer from './withAltburguer'
import withIntl from './withIntl'

export default {
  title: 'tenant/SortSite',
  component: SortSite,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withIntl],
}

export const initial = () => (
  <WithAltburguer>
    <SortSite />
  </WithAltburguer>
)
