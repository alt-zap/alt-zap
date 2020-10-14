import React from 'react'

import PaymentSelector from '../customer/PaymentSelector'
import withOrder from './withOrder'
import withIntl from './withIntl'
import WithAltburguer from './withAltburguer'

export default {
  title: 'common/PaymentSelector',
  component: PaymentSelector,
  decorators: [withOrder, withIntl],
}

export const Default = () => (
  <div className="pa2 flex justify-end">
    <WithAltburguer>
      <PaymentSelector />
    </WithAltburguer>
  </div>
)
