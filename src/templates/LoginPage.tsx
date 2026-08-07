import React, { FC, useEffect } from 'react'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

import { loginWithGoogle, useAuth } from '../contexts/auth/AuthContext'

const LoginPage: FC = () => {
  const [{ user, userDb, loading }] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !userDb) {
      navigate('/app/onboard')

      return
    }

    if (user) {
      navigate('/app/tenants')
    }

    if (!user && !userDb && !loading) {
      // Temporary
      loginWithGoogle()
    }
  }, [user, userDb, loading, navigate])

  return loading ? (
    <div className="flex items-center flex-column mt3">
      <Spin />
      Estamos configurando seu ambiente!
    </div>
  ) : null
}

export default LoginPage
