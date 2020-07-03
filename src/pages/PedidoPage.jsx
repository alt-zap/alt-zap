import React from "react"

import { TenantContextProvider } from "../contexts/TenantContext"
import Pedido from "../components/Pedido"

export default ({ slug }) => {
  return (
    <TenantContextProvider slug={slug}>
      <Pedido />
    </TenantContextProvider>
  )
}
