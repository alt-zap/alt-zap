import React from 'react'

import { OrderDetailsModal } from '../tenant/orders/components/OrderDetailsModal'
import { fulfilledOrder } from './OrderTimeline.stories'
import WithAltburguer from './withAltburguer'
import withIntl from './withIntl'

export default {
  title: 'orders/OrderDetails',
  component: OrderDetailsModal,
  decorators: [withIntl, (story: any) => <div className="pa2">{story()}</div>],
}

export const Default = () => (
  <div style={{ maxWidth: 600 }}>
    <WithAltburguer>
      <OrderDetailsModal order={fulfilledOrder} onAction={() => {}} />
    </WithAltburguer>
  </div>
)
