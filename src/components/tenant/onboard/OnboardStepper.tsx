import React, { FC, useState } from 'react'
import { Steps } from 'antd'

import { Message } from '../../../intlConfig'
import UserForm from './UserForm'

const { Step } = Steps

const OnboardStepper: FC = () => {
  const [step, setStep] = useState(0)

  return (
    <div className="pa4">
      <Steps current={step}>
        <Step title={<Message id="onboard.personalData" />} />
        <Step title={<Message id="onboard.yourBusiness" />} />
      </Steps>
      <div className="tc pv3">
        <Message id="onboard.fillYourData" />
      </div>
      <UserForm onSubmit={() => {}} />
    </div>
  )
}

export default OnboardStepper
