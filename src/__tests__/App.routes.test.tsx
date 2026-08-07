import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { App } from '../App'

jest.mock('../pages/index', () => ({
  __esModule: true,
  default: function MockHomePage() {
    return <div>Landing</div>
  },
}))

jest.mock('../templates/OrderPage', () => ({
  __esModule: true,
  default: function MockOrderPage() {
    return <div>Store</div>
  },
}))

jest.mock('../templates/LoginPage', () => ({
  __esModule: true,
  default: function MockLoginPage() {
    return <div>Login</div>
  },
}))

jest.mock('../templates/OnboardPage', () => ({
  __esModule: true,
  default: function MockOnboardPage() {
    return <div>Onboard</div>
  },
}))

jest.mock('../templates/AdminPage', () => ({
  __esModule: true,
  default: function MockAdminPage() {
    return <div>Admin</div>
  },
}))

jest.mock('../templates/TenantsPage', () => ({
  __esModule: true,
  default: function MockTenantsPage() {
    return <div>Tenants</div>
  },
}))

jest.mock('../templates/TenantDashboardPage', () => ({
  __esModule: true,
  default: function MockTenantDashboardPage() {
    return <div>Dashboard</div>
  },
}))

describe('App routes', () => {
  it('renderiza landing em /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Landing')).toBeTruthy()
  })

  it('não trata /app/login como slug de loja', () => {
    render(
      <MemoryRouter initialEntries={['/app/login']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.queryByText('Store')).toBeNull()
  })

  it('renderiza loja em /bardolucis', () => {
    render(
      <MemoryRouter initialEntries={['/bardolucis']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Store')).toBeTruthy()
  })
})
