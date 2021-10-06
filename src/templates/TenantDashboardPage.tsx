import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import TenantDashboard from '../components/tenant/TenantDashboard'
import { OrdersContextProvider } from '../contexts/orders/OrdersContext'

type Props = {
  tenantId: string
}

const TenantDashboardPage: FC<RouteComponentProps<Props>> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <OrdersContextProvider>
        <TenantDashboard />
      </OrdersContextProvider>
    </TenantContextProvider>
  )
}

export default TenantDashboardPage
