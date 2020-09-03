import React, { FC } from 'react'

import OpeningHours from './OpeningHours'
import OperationOptions from './OperationOptions'

const OperationDashboard: FC = () => {
  return (
    <div className="flex flex-column flex-row-l items-center items-start-l">
      <OpeningHours />
      <OperationOptions />
    </div>
  )
}

export default OperationDashboard
