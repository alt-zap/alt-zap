import React, { FC, useEffect } from 'react'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/auth/AuthContext'

const UserSwitch: FC = () => {
  const [{ user, userDb, loading }] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    if (!user) {
      navigate('/app/login')

      return
    }

    if (!userDb?.hasTenant || !userDb.document) {
      navigate('/app/onboard')

      return
    }

    navigate('/app/tenants')
  }, [loading, user, userDb, navigate])

  if (loading) {
    return (
      <div className="flex justify-center pt2">
        <Spin />
      </div>
    )
  }

  return <span>Wow, you definitely on trouble</span>
}

export default UserSwitch
