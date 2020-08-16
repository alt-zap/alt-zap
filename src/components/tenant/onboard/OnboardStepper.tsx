import React, { FC, useState, useCallback } from 'react'
import { Steps } from 'antd'

import { Message } from '../../../intlConfig'
import UserForm from './UserForm'
import TenantDataForm from '../TenantDataForm'
import { TenantConfig } from '../../../typings'
import personalInfo from '../../../assets/personal.svg'

const { Step } = Steps

const OnboardStepper: FC = () => {
  const [step, setStep] = useState(0)

  const handleUserSubmit = useCallback(() => {
    // Create actions for creating user
    // Using the UserContext to update
    setStep(1)
  }, [])

  const handleTenantSubmit = useCallback((data: Partial<TenantConfig>) => {
    // Use Tenant Context
    // Create actions for creating the tenant
    // Initialize Tenant
    return Promise.resolve()
  }, [])

  return (
    <div className="pa4">
      <Steps current={step}>
        <Step title={<Message id="onboard.personalData" />} />
        <Step title={<Message id="onboard.yourBusiness" />} />
      </Steps>
      {step === 0 && (
        <div className="flex flex-column">
          <div className="flex justify-between-l items-center pv4 flex-row-l flex-column">
            <div className="flex flex-column w-90 w-60-l">
              <h1>Falta pouco!</h1>
              <p className="f4">
                Precisamos que você preencha alguns <b>dados pessoais</b> antes
                de configurar a página do seu negócio.
              </p>
            </div>
            <img
              src={personalInfo}
              alt="Personal Info"
              style={{
                maxWidth: '200px',
              }}
            />
          </div>
          <UserForm onSubmit={handleUserSubmit} />
        </div>
      )}
      {step === 1 && <TenantDataForm onSubmit={handleTenantSubmit} />}
    </div>
  )
}

export default OnboardStepper
