import React from "react"
import { useNavigate } from "@reach/router"

import { useAuth } from "../contexts/AuthContext"

// uid
export default () => {
  const { user, userDb, loading } = useAuth()
  return (
    <div>
      <h1>EditTenant</h1>
    </div>
  )
}
