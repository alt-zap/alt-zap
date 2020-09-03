import React, { FC } from 'react'

import PaymentMethods from './PaymentMethods'

const PaymentsDashboard: FC = () => {
  return (
    <div className="flex flex-column flex-row-l items-center items-start-l">
      <PaymentMethods />
    </div>
  )
}

export default PaymentsDashboard
