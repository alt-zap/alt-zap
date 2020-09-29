import React, { FC, useEffect } from 'react'
import { Spin } from 'antd'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'

import { loginWithGoogle, useAuth } from '../contexts/auth/AuthContext'

const LoginPage: FC<RouteComponentProps> = () => {
  const [{ user, userDb, loading }] = useAuth()

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
  }, [user, userDb, loading])

  return loading ? (
    <div className="flex items-center flex-column mt3">
      <Spin />
      Estamos configurando seu ambiente!
    </div>
  ) : null
}

export default LoginPage
