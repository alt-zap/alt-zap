import React from "react"

import EditTenant from "../components/EditTenant"
import { TenantContextProvider } from "../contexts/TenantContext"

export default ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <EditTenant />
    </TenantContextProvider>
  )
}
