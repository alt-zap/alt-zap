import React from "react"

import { TenantContextProvider } from "../contexts/TenantContext"
import Home from "./Home"

export default ({ slug }) => {
  return (
    <TenantContextProvider slug={slug || process.env.REACT_APP_DEFAULT_SLUG}>
      <Home />
    </TenantContextProvider>
  )
}
