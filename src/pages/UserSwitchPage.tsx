import React, { FC } from 'react'
import { Spin } from 'antd'
import { useNavigate, RouteComponentProps } from '@reach/router'

import { useAuth } from '../contexts/AuthContext'

const UserSwitch: FC<RouteComponentProps> = () => {
  const { user, userDb, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return <Spin />
  }

  if (!user) {
    navigate('/login')
  }

  if (user && !userDb) {
    navigate(`/onboard`)
  }

  if (user && userDb) {
    navigate(`/tenants`)
  }

  return <span>Wow, you're definitely on trouble</span>
}

export default UserSwitch
