import React from "react"

import { TenantContextProvider } from "../contexts/TenantContext"
import Home from "./Home"

export default ({ slug }) => {
  return (
    <TenantContextProvider slug={slug}>
      <Home />
    </TenantContextProvider>
  )
}
