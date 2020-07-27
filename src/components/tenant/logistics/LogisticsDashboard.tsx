/* eslint-disable no-console */
import React, { FC } from 'react'
import { Divider } from 'antd'

import Address from '../../AddressForm'
import ShippingStrategies from './ShippingStrategies'

const LogisticsDashboard: FC = () => {
  return (
    <div className="flex flex-column flex-row-l">
      <div className="w-100 w-50-l ph2">
        <Divider>Endereço da Unidade</Divider>
        <Address onValidSubmit={(a) => console.log(a)} />
      </div>
      <div className="w-100 w-50-l ph2">
        <Divider>Modalidades</Divider>
        <ShippingStrategies />
      </div>
    </div>
  )
}

export default LogisticsDashboard
