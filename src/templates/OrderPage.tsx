import React, { FC } from 'react'
import { PageProps } from 'gatsby'
import { RouteComponentProps, Router } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import Order from '../components/Order'
import { OrderContextProvider } from '../contexts/order/OrderContext'

interface Props extends PageProps {
  slug: string
  physicStore?: boolean
}

const OrderPage: FC<RouteComponentProps<Props>> = ({ slug, physicStore }) => {
  return (
    <TenantContextProvider slug={slug}>
      <OrderContextProvider>
        <Order physicStore={physicStore} />
      </OrderContextProvider>
    </TenantContextProvider>
  )
}

const RouteWrapper = () => {
  return (
    <Router>
      <OrderPage path="/:slug" physicStore={false} />
      <OrderPage path="/:slug/loja-fisica" physicStore />
    </Router>
  )
}

export default RouteWrapper
