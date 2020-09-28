import React, { FC, useEffect } from 'react'
import { Spin } from 'antd'
import { RouteComponentProps, useNavigate } from '@reach/router'

import { useAuth } from '../contexts/auth/AuthContext'

const LoginPage: FC<RouteComponentProps> = () => {
  const [{ user, userDb, loading }] = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user && !userDb) {
      navigate('/onboard')

      return
    }

    if (user) {
      navigate('/')
    }
  }, [user, navigate, userDb])

  return loading ? (
    <div className="flex items-center flex-column mt3">
      <Spin />
      Estamos configurando seu ambiente!
    </div>
  ) : null
}

export default LoginPage
