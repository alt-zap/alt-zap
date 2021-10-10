import React, { FC } from 'react'

import { useOrdersState } from '../../../contexts/orders/OrdersContext'
import { OrderSummary } from './OrderSummary'

export const OrdersList: FC = () => {
  const { orders } = useOrdersState()

  return (
    <div className="flex flex-column">
      {orders?.map((order) => (
        <OrderSummary order={order} key={order.id} />
      ))}
    </div>
  )
}

OrdersList.displayName = 'OrdersList'
