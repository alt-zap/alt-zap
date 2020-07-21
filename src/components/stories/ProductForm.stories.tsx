import React from 'react'

import TenantDataForm from '../tenant/TenantDataForm'

export default {
  title: 'tenant|TenantDataForm',
  component: TenantDataForm,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const classic = () => <TenantDataForm />
export const WithData = () => (
  <TenantDataForm
    initialData={{
      name: 'Bar do Lucis',
      slug: 'bardolucis',
      whatsapp: '+55 (83) 99432-2457',
      instagram: 'bardolucis',
      color: '#ff0000',
    }}
  />
)
