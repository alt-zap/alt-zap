import React from 'react'

import TenantDataForm from '../tenant/TenantDataForm'

export default {
  title: 'tenant|TenantDataForm',
  component: TenantDataForm,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const classic = () => <TenantDataForm />
