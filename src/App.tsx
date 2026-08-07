import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/index'
import LoginPage from './templates/LoginPage'
import OnboardPage from './templates/OnboardPage'
import AdminPage from './templates/AdminPage'
import TenantsPage from './templates/TenantsPage'
import TenantDashboardPage from './templates/TenantDashboardPage'
import OrderPage from './templates/OrderPage'
import SEO from './components/SEO'

export function App() {
  return (
    // No Gatsby, o SEO global só cobria /app/* (o antigo pages/app.tsx);
    // agora que tudo mora numa única árvore de rotas, ele precisa envolver
    // as rotas para manter favicon/meta em /app/*, /app/tenants e /:slug.
    <Fragment>
      <SEO />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/onboard" element={<OnboardPage />} />
        <Route path="/app/tenants" element={<AdminPage />}>
          <Route index element={<TenantsPage />} />
          <Route path=":tenantId" element={<TenantDashboardPage />} />
        </Route>
        {/* Precisa ser a última: captura qualquer slug de loja restante. */}
        <Route path="/:slug" element={<OrderPage />} />
      </Routes>
    </Fragment>
  )
}
