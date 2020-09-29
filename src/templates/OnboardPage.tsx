import React, { FC } from 'react'
import { useNavigate, RouteComponentProps } from '@reach/router'

import AdminPage from './AdminPage'
import { useAuth } from '../contexts/auth/AuthContext'
import OnboardStepper from '../components/tenant/onboard/OnboardStepper'

const OnboardPage: FC<RouteComponentProps> = () => {
  const [{ user }] = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate(`/`)
  }

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
