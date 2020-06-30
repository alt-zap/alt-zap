import React from "react"
import { useNavigate } from "@reach/router"

import { useAuth } from "../contexts/AuthContext"

// uid
export default () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  if (!user) {
    navigate(`/`)
  }

  console.log({ user })
  return (
    <div className="flex flex-column items-center ph2">
      <h1>Bem vindo</h1>
    </div>
  )
}
