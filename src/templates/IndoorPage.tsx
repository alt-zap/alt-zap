import React, { FC } from 'react'
import { PageProps } from 'gatsby'
import { RouteComponentProps, Router } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import Order from '../components/Order'
import { OrderContextProvider } from '../contexts/order/OrderContext'

interface Props extends PageProps {
  tenantId: string
}

const IndoorPage: FC<RouteComponentProps<Props>> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <OrderContextProvider>
        <Order mode="INDOOR" />
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
