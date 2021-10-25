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
      product: {
        highlight: false,
        price: 500,
        live: true,
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/01c0582e-bf4e-442f-ba39-56e3862a3031.jpeg?alt=media&token=3c4e79b3-2a10-4246-bc5e-7029d3eb4dd4',
        category: 1,
        assemblyOptions: [
          {
            name: 'Tamanho',
            price: 0,
            min: 1,
            max: 1,
            options: [
              { initialQuantity: 1, name: 'Pequeno', live: true, price: 0 },
              { live: true, price: 200, initialQuantity: 0, name: 'Grande' },
            ],
            live: true,
            type: 'SINGLE',
          },
          {
            live: true,
            name: 'Adicionais',
            max: 3,
            options: [
              { price: 50, live: true, name: 'Bacon' },
              { price: 10, name: 'Queijo Minas', live: true },
              { live: true, name: 'Orégano' },
            ],
            min: 0,
            type: 'REPEAT',
          },
        ],
        userId: '1UkJgg2rsrVBJ0uLM17lPuNaID93',
        name: 'Pamonha',
        id: 'Y1v03t9wpJIYbu29tOFF',
      },
      quantity: 1,
      selectedItems: [
        { name: 'Tamanho', options: [{ name: 'Pequeno', quantity: 1 }] },
        {
          name: 'Adicionais',
          options: [
            { name: 'Bacon', quantity: 2 },
            { name: 'Queijo Minas', quantity: 0 },
            { name: 'Orégano', quantity: 1 },
          ],
        },
      ],
      itemPrice: 800,
    },
    {
      product: {
        highlight: false,
        name: 'Queijo de Cabra',
        price: 2000,
        category: 1,
        description:
          'Cabras que pastam felizes na Fazenda Pocinhos da cidade de Boa Vista - PB',
        userId: '1UkJgg2rsrVBJ0uLM17lPuNaID93',
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/5b593638-eee1-4efb-b093-c86a7168985b.jpg?alt=media&token=960edc19-9d59-427c-a28b-eae15e587491',
        live: true,
        id: 'm4CSJ0zcZ3oUIZxB6ynY',
      },
      quantity: 2,
      selectedItems: [],
      itemPrice: 4000,
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
