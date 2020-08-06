import React, { FC } from 'react'

import PaymentMethods from './PaymentMethods'

const PaymentsDashboard: FC = () => {
  return (
    <div className="flex">
      <PaymentMethods />
    </div>
  )
}

export default PaymentsDashboard
