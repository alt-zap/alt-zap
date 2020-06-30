import React from "react"
import { Spin } from "antd"
import { useNavigate } from "@reach/router"

import { useAuth } from "../contexts/AuthContext"

export default () => {
  const { user, userDb, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return <Spin />
  }

  if (!user) {
    navigate("/login")
  }

  if (user && !userDb) {
    navigate(`/onboard`)
  }

  if (user && userDb) {
    navigate(`/edit-tenant`)
  }

  return <span>Wow, you're definitely on trouble</span>
}
