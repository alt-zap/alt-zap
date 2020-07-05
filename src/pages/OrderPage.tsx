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
      <div className="flex justify-center">
        <div className="w-90 w-50-l">
          <Pedido />
        </div>
      </div>
    </TenantContextProvider>
  )
}

export default OrderPage
