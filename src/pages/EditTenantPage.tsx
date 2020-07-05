import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import EditTenant from '../components/EditTenant'
import { TenantContextProvider } from '../contexts/TenantContext'
import AdminPage from '../templates/AdminPage'

type Props = {
  tenantId: string
}

const EditTenantPage: FC<RouteComponentProps<Props>> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <AdminPage>
        <EditTenant />
      </AdminPage>
    </TenantContextProvider>
  )
}

export default EditTenantPage
