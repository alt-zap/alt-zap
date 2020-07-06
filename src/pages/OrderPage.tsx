import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { TenantContextProvider } from '../contexts/TenantContext'
import Pedido from '../components/Order'

type Props = {
  slug: string
}

const OrderPage: FC<RouteComponentProps<Props>> = ({ slug }) => {
  return (
    <TenantContextProvider slug={slug}>
      <Pedido />
    </TenantContextProvider>
  )
}

export default OrderPage
