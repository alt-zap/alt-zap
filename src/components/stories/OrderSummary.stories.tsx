import React from 'react'

import { Order } from '../../typings'
import { OrderSummary } from '../tenant/orders/OrderSummary/components/index'
import WithAltburguer from './withAltburguer'
import withIntl from './withIntl'

export default {
  title: 'orders/OrderSummary',
  component: OrderSummary,
  decorators: [withIntl, (story: any) => <div className="pa2">{story()}</div>],
}

const baseOrder: Order = {
  customer: {
    name: 'Juliette',
  },
  table: 4,
  createdAt: Date.now(),
  date: '',
  type: 'HOME',
  state: 'CREATED',
  stateChanges: [],
  totalizers: {
    totalPrice: 1650,
  },
  items: [
    {
      itemPrice: 2500,
      product: {
        live: true,
        category: 1,
        price: 2500,
        userId: '',
        highlight: false,
        name: 'Caipirinha de Limão',
      },
      quantity: 1,
      selectedItems: [],
    },
    {
      itemPrice: 2500,
      product: {
        live: true,
        category: 1,
        price: 2500,
        userId: '',
        highlight: false,
        name: 'Caipirinha de Limão',
      },
      quantity: 1,
      selectedItems: [],
    },
  ],
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
  <div style={{ maxWidth: 600 }}>
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
