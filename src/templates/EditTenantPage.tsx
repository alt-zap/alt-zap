import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'

type Props = {
  tenantId: string
}

const EditTenantPage: FC<RouteComponentProps<Props>> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <div>Moved Permanently</div>
    </TenantContextProvider>
  )
}

export default EditTenantPage
