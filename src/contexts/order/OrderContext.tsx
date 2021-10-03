import React, { FC, useEffect, useReducer } from 'react'
import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore'

import { createCtx, sanitizeForFirebase } from '../../utils'
import { Order } from '../../typings'
import {
  OrderContextActions,
  OrderContextState,
  orderStateReducer,
} from './orderReducer'
import { tenantRef } from '../TenantContext'

export type Dispatch = (action: OrderContextActions) => void

export const [useOrderState, OrderStateProvider] = createCtx<
  OrderContextState
>()
export const [useOrderDispatch, OrderDispatchProvider] = createCtx<Dispatch>()

export const useOrder = () =>
  [useOrderState(), useOrderDispatch()] as [OrderContextState, Dispatch]

const initialOrder: Order = {
  items: [],
  date: new Date().toISOString(),
  totalizers: {
    totalPrice: 0,
    shippingPrice: 0,
    finalPrice: 0,
  },
}

export const OrderContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(orderStateReducer, {
    order: initialOrder,
  })

  useEffect(() => {
    const totalPrice =
      state.order?.items
        .filter(Boolean)
        .reduce((acc, { itemPrice }) => acc + itemPrice, 0) ?? 0

    const shippingPrice = state.order?.shipping?.price ?? 0

    if (shippingPrice !== state.order?.totalizers?.shippingPrice) {
      dispatch({ type: 'SET_SHIPPING_PRICE', args: shippingPrice })
    }

    if (totalPrice !== state.order?.totalizers?.totalPrice) {
      dispatch({ type: 'SET_TOTAL_PRICE', args: totalPrice })
    }
  }, [state.order])

  return (
    <OrderStateProvider value={state}>
      <OrderDispatchProvider value={dispatch}>{children}</OrderDispatchProvider>
    </OrderStateProvider>
  )
}

export const addOrder = async (
  dispatch: Dispatch,
  {
    order,
    tenantId,
  }: {
    order: Order
    tenantId?: string
  }
) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  return ref
    .collection('orders')
    .add(sanitizeForFirebase(order))
    .then((ent) => {
      dispatch({ type: 'SET_PARTIAL_ORDER', args: { id: ent.id } })
    })
}
