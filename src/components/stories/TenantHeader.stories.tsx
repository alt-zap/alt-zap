import React from 'react'

import TenantHeader from '../order/TenantHeader'
import WithAltburguer from './withAltburguer'
import withIntl from './withIntl'

export default {
  title: 'order/TenantHeader',
  component: TenantHeader,
  decorators: [
    withIntl,
    (a: any) => (
      <div style={{ height: '100vh', backgroundColor: '#F0F2F5' }}>{a()}</div>
    ),
  ],
}

export const Altburguer = () => (
  <WithAltburguer>
    <TenantHeader />
  </WithAltburguer>
)

export const DomSabor = () => (
  <WithAltburguer
    overrides={{
      color: '#9F2019',
      logoSrc:
        'https://image.freepik.com/vetores-gratis/pizza-logo-design-template_15146-191.jpg',
    }}
  >
    <TenantHeader />
  </WithAltburguer>
)

export const Default = () => (
  <WithAltburguer overrides={{ color: undefined, logoSrc: undefined }}>
    <TenantHeader />
  </WithAltburguer>
)

export const parameters = {
  layout: 'fullscreen',
}
