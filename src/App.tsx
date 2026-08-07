import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/index'
import LoginPage from './templates/LoginPage'
import OnboardPage from './templates/OnboardPage'
import AdminPage from './templates/AdminPage'
import TenantsPage from './templates/TenantsPage'
import TenantDashboardPage from './templates/TenantDashboardPage'
import OrderPage from './templates/OrderPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app/login" element={<LoginPage />} />
      <Route path="/app/onboard" element={<AdminPage />}>
        <Route index element={<OnboardPage />} />
      </Route>
      <Route path="/app/tenants" element={<AdminPage />}>
        <Route index element={<TenantsPage />} />
        <Route path=":tenantId" element={<TenantDashboardPage />} />
      </Route>
      {/* Precisa ser a última: captura qualquer slug de loja restante. */}
      <Route path="/:slug" element={<OrderPage />} />
    </Routes>
  )
}
