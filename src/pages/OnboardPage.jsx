import React from "react"
import { useNavigate } from "@reach/router"

import { useAuth } from "../contexts/AuthContext"
import TenantForm from "../components/TenantForm"

export default () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  if (!user) {
    navigate(`/`)
  }

  return (
    <div className="flex flex-column items-center ph2">
      <TenantForm />
    </div>
  )
}
