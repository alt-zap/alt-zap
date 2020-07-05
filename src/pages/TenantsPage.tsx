import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import ListTenants from '../components/tenant/ListTenants'

const TenantsPage: FC<RouteComponentProps> = () => {
  return <ListTenants />
}

export default TenantsPage
