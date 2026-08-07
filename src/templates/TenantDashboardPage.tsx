import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import { TenantContextProvider } from '../contexts/TenantContext'
import TenantDashboard from '../components/tenant/TenantDashboard'

const TenantDashboardPage: FC = () => {
  const { tenantId } = useParams<{ tenantId: string }>()

  return (
    <TenantContextProvider tenantId={tenantId}>
      <TenantDashboard />
    </TenantContextProvider>
  )
}

export default TenantDashboardPage
