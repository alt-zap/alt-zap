import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import TenantDashboard from '../components/tenant/TenantDashboard'

type Props = {
  tenantId: string
}

const TenantDashboardPage: FC<RouteComponentProps<Props>> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <TenantDashboard />
    </TenantContextProvider>
  )
}

export default TenantDashboardPage
