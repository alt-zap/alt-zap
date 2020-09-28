import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import Order from '../components/Order'
import { OrderContextProvider } from '../contexts/order/OrderContext'

type Props = {
  slug: string
}

const OrderPage: FC<RouteComponentProps<Props>> = ({ slug }) => {
  return (
    <TenantContextProvider slug={slug}>
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </TenantContextProvider>
  )
}

export default OrderPage
