import React, { FC } from 'react'
import { Spin } from 'antd'
import { useNavigate, RouteComponentProps } from '@reach/router'

import { useAuth } from '../contexts/auth/AuthContext'

const UserSwitch: FC<RouteComponentProps> = () => {
  const [{ user, userDb, loading }] = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex justify-center pt2">
        <Spin />
      </div>
    )
  }

  if (!user) {
    navigate('/login')

    return null
  }

  if ((user && !userDb) || !userDb?.hasTenant) {
    navigate(`/onboard`)

    return null
  }

  if (user && userDb) {
    navigate(`/tenants`)

    return null
  }

  return <span>Wow, you definitely on trouble</span>
}

export default UserSwitch
