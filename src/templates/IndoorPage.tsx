import React, { FC } from 'react'
import { PageProps } from 'gatsby'
import { RouteComponentProps, Router } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import Order from '../components/Order'
import { OrderContextProvider } from '../contexts/order/OrderContext'

interface Props extends PageProps {
  slug: string
}

const IndoorPage: FC<RouteComponentProps<Props>> = ({ slug }) => {
  return (
    <TenantContextProvider slug={slug}>
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </TenantContextProvider>
  )
}

const RouteWrapper = () => {
  return (
    <Router>
      <IndoorPage path="/indoor/:tenantId" />
    </Router>
  )
}

export default RouteWrapper
