import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import { TenantContextProvider } from '../contexts/TenantContext'
import Order from '../components/Order'
import { OrderContextProvider } from '../contexts/order/OrderContext'

const OrderPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()

  return (
    <TenantContextProvider slug={slug}>
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </TenantContextProvider>
  )
}

export default OrderPage
