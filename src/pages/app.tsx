import React, { FC } from 'react'
import NoSSR from 'react-no-ssr'
import { Router } from '@reach/router'

import TenantsPage from '../templates/TenantsPage'
import AdminPage from '../templates/AdminPage'
import TenantDashboardPage from '../templates/TenantDashboardPage'
import LoginPage from '../templates/LoginPage'
import OnboardPage from '../templates/OnboardPage'

const App: FC = () => {
  return (
    <NoSSR>
      <Router>
        <LoginPage path="/app/login" />
        <OnboardPage path="/app/onboard" />
        <AdminPage path="/app/tenants">
          <TenantDashboardPage path="/:tenantId" />
          <TenantsPage path="/" />
        </AdminPage>
      </Router>
    </NoSSR>
  )
}

export default App
