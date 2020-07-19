import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import EditTenant from '../components/EditTenant'
import { TenantContextProvider } from '../contexts/TenantContext'

type Props = {
  tenantId: string
}

const EditTenantPage: FC<RouteComponentProps<Props>> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <EditTenant />
    </TenantContextProvider>
  )
}

export default EditTenantPage
