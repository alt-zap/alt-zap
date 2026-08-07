import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AdminPage from './AdminPage'
import { useAuth } from '../contexts/auth/AuthContext'
import OnboardStepper from '../components/tenant/onboard/OnboardStepper'

const OnboardPage: FC = () => {
  const [{ user }] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <AdminPage>
      <div className="flex flex-column items-center ph2">
        <div className="bg-white pa3 ma3 mt5 w-90 w-70-l">
          <OnboardStepper />
        </div>
      </div>
    </AdminPage>
  )
}

export default OnboardPage
