import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import ListTenants from '../components/tenant/ListTenants'
import AdminPage from '../templates/AdminPage'

const TenantsPage: FC<RouteComponentProps> = () => {
  return (
    <AdminPage>
      <ListTenants />
    </AdminPage>
  )
}

export default TenantsPage
