/* eslint-disable no-console */
import React, { FC } from 'react'
import { Divider } from 'antd'

import ShippingStrategies from './ShippingStrategies'
import TenantAddress from './TenantAddress'

const LogisticsDashboard: FC = () => {
  return (
    <div className="flex flex-column flex-row-l items-center items-start-l">
      <div className="w-90 w-50-l bg-white mv2 ml0 ml4-l pb3 ph3 br1">
        <TenantAddress />
      </div>
      <div className="w-90 w-50-l bg-white mv2 ml0 mh4-l pb3 ph3 br1">
        <Divider>Modalidades</Divider>
        <ShippingStrategies />
      </div>
    </div>
  )
}

export default LogisticsDashboard
