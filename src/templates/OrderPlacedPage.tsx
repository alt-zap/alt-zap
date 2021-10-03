import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import { OrderPlaced } from '../components/tenant/OrderPlaced'

type Props = {
  tenantId: string
}

const OrderPlacedPage: FC<RouteComponentProps<Props>> = ({ tenantId }) => {
  return (
    <TenantContextProvider tenantId={tenantId}>
      <OrderPlaced />
    </TenantContextProvider>
  )
}

export default OrderPlacedPage
