import { Order } from '@src/typings'
import React from 'react'

import { OrderTimeline } from '../tenant/orders/components/OrderTimeline'
import { OrderSummary } from '../tenant/orders/OrderSummary/component'
import { baseOrder } from './fixtures/orders'
import withIntl from './withIntl'

export default {
  title: 'orders/OrderTimeline',
  component: OrderSummary,
  decorators: [withIntl, (story: any) => <div className="pa2">{story()}</div>],
}

const justCreatedOrder: Order = {
  ...baseOrder,
  stateChanges: [
    {
      date: +new Date('2021-09-17T16:24:00'),
      state: 'CREATED',
    },
  ],
}

const confirmedOrder: Order = {
  ...baseOrder,
  stateChanges: [
    {
      date: +new Date('2021-09-17T16:24:00'),
      state: 'CREATED',
    },
    {
      date: +new Date('2021-09-17T16:24:31'),
      state: 'CONFIRMED',
    },
  ],
}

export const fulfilledOrder: Order = {
  ...baseOrder,
  stateChanges: [
    {
      date: +new Date('2021-09-17T16:24:00'),
      state: 'CREATED',
    },
    {
      date: +new Date('2021-09-17T16:24:31'),
      state: 'CONFIRMED',
    },
    {
      date: +new Date('2021-09-17T17:05:17'),
      state: 'FULFILLED',
    },
  ],
}

const canceledOrder: Order = {
  ...baseOrder,
  stateChanges: [
    {
      date: +new Date('2021-09-17T16:24:00'),
      state: 'CREATED',
    },
    {
      date: +new Date('2021-09-17T16:24:31'),
      state: 'CANCELED',
    },
  ],
}

const fulfilledMultidayOrder: Order = {
  ...baseOrder,
  stateChanges: [
    {
      date: +new Date('2021-09-17T16:24:00'),
      state: 'CREATED',
    },
    {
      date: +new Date('2021-09-18T00:05:54'),
      state: 'CONFIRMED',
    },
    {
      date: +new Date('2021-09-18T01:05:17'),
      state: 'FULFILLED',
    },
  ],
}

export const Created = () => (
  <div style={{ maxWidth: 600 }}>
    <OrderTimeline order={justCreatedOrder} />
  </div>
)

export const Confirmed = () => (
  <div style={{ maxWidth: 600 }}>
    <OrderTimeline order={confirmedOrder} />
  </div>
)

export const Fulfilled = () => (
  <div style={{ maxWidth: 600 }}>
    <OrderTimeline order={fulfilledOrder} />
  </div>
)

export const Canceled = () => (
  <div style={{ maxWidth: 600 }}>
    <OrderTimeline order={canceledOrder} />
  </div>
)

export const FulfilledMultiday = () => (
  <div style={{ maxWidth: 600 }}>
    <OrderTimeline order={fulfilledMultidayOrder} />
  </div>
)
