import React, { FC } from 'react'

import { TenantContextProvider } from '../contexts/TenantContext'

type Props = {
  tenantId: string
}

const EditTenantPage: FC<Props> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <div>Moved Permanently</div>
    </TenantContextProvider>
  )
}

export default EditTenantPage
