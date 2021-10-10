import React, { FC, useEffect, useReducer } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { createCtx, sanitizeForFirebase } from '../../utils'
import { Order } from '../../typings'
import {
  OrdersContextActions,
  OrdersContextState,
  ordersStateReducer,
} from './ordersReducer'
import { tenantRef, useTenantConfig } from '../TenantContext'

export type Dispatch = (action: OrdersContextActions) => void

export const [useOrdersState, OrdersStateProvider] = createCtx<
  OrdersContextState
>()
export const [useOrdersDispatch, OrdersDispatchProvider] = createCtx<Dispatch>()

export const useOrders = () =>
  [useOrdersState(), useOrdersDispatch()] as [OrdersContextState, Dispatch]

export const OrdersContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(ordersStateReducer, {
    orders: [],
  })

  const { tenantId } = useTenantConfig()

  useEffect(() => {
    if (!tenantId) {
      return
    }

    const db = firebase.firestore()
    const ref = db
      .collection('tenants')
      .doc(tenantId)
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(50)
    // TODO: Implement orders pagination

    const unsub = ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const action = change.type === 'added' ? 'ADD_ORDER' : 'UPDATE_ORDER'

        dispatch({
          type: action,
          args: {
            ...(change.doc.data() as Order),
            id: change.doc.id,
          },
        })
      })
    })

    return unsub
  }, [tenantId])

  return (
    <OrdersStateProvider value={state}>
      <OrdersDispatchProvider value={dispatch}>
        {children}
      </OrdersDispatchProvider>
    </OrdersStateProvider>
  )
}

export const updateOrder = async ({
  orderData,
  tenantId,
}: {
  orderData: Order
  tenantId?: string
}) => {
  if (!tenantId) {
    return Promise.reject('Tenant ID missing')
  }

  const db = firebase.firestore()
  const ref = tenantRef(db, tenantId)

  const { id, ...order } = orderData

  return ref.collection('orders').doc(id).update(sanitizeForFirebase(order))
}
