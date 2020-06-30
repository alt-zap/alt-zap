import React from "react"
import { useNavigate } from "@reach/router"
import { GoogleLoginButton } from "react-social-login-buttons"

import { useAuth } from "../contexts/AuthContext"

// uid
export default () => {
  const { loginWithGoogle, user } = useAuth()

  const navigate = useNavigate()

  if (user) {
  }

  return (
    <div className="flex flex-column items-center ph2">
      <h1>Login</h1>
      <GoogleLoginButton onClick={() => loginWithGoogle()} />
    </div>
  )
}
