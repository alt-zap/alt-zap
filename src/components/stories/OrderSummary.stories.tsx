import React from 'react'

import { Order } from '../../typings'
import OrderSummary from '../OrderSummary'

export default {
  title: 'orders/OrderSummary',
  component: OrderSummary,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

const baseOrder: Order = {
  customer: {
    name: 'Juliette',
  },
  type: 'HOME',
  state: 'CREATED',
  date: Date.now().toString(),
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
  ],
}

export const Full = () => <OrderSummary mode="full" order={baseOrder} />

export const Lean = () => <OrderSummary mode="lean" order={baseOrder} />
