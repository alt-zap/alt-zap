import React from 'react'

import { Order } from '../../typings'
import { OrderSummary } from '../tenant/orders/OrderSummary/component'
import { baseOrder } from './fixtures/orders'
import WithAltburguer from './withAltburguer'
import withIntl from './withIntl'

export default {
  title: 'orders/OrderSummary',
  component: OrderSummary,
  decorators: [withIntl, (story: any) => <div className="pa2">{story()}</div>],
}

export const Full = () => (
  <div style={{ maxWidth: 600 }}>
    <WithAltburguer>
      <OrderSummary mode="full" order={baseOrder} onAction={() => {}} />
      <div className="pa2" />
      <OrderSummary
        mode="full"
        order={{ ...baseOrder, state: 'CONFIRMED' }}
        onAction={() => {}}
      />
      <div className="pa2" />
      <OrderSummary
        mode="full"
        order={{ ...baseOrder, state: 'CANCELED' }}
        onAction={() => {}}
      />
      <div className="pa2" />
      <OrderSummary
        mode="full"
        order={{ ...baseOrder, state: 'FULFILLED' }}
        onAction={() => {}}
      />
    </WithAltburguer>
  </div>
)

export const Lean = () => (
  <div style={{ maxWidth: 1000 }}>
    <WithAltburguer>
      <OrderSummary mode="lean" order={baseOrder} onAction={() => {}} />
      <div className="pa2" />
      <OrderSummary
        mode="lean"
        order={{ ...baseOrder, state: 'CONFIRMED' }}
        onAction={() => {}}
      />
      <div className="pa2" />
      <OrderSummary
        mode="lean"
        order={{ ...baseOrder, state: 'CANCELED' }}
        onAction={() => {}}
      />
      <div className="pa2" />
      <OrderSummary
        mode="lean"
        order={{ ...baseOrder, state: 'FULFILLED' }}
        onAction={() => {}}
      />
    </WithAltburguer>
  </div>
)
