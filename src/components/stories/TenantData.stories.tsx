import React from 'react'

import TenantDataForm from '../tenant/TenantDataForm'
import withIntl from './withIntl'

export default {
  title: 'tenant/TenantDataForm',
  component: TenantDataForm,
  decorators: [withIntl],
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
