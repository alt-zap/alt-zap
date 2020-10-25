import React, { FC, useState } from 'react'
import { Button, Form, Input, Steps } from 'antd'

import { WorldAddress } from '../../typings'
import SmartAddress from '../tenant/logistics/SmartAddress'
import AddressDisplay from './AddressDisplay'
import { useAltIntl } from '../../intlConfig'

const { Step } = Steps

type Props = { onValidAddress: (address: WorldAddress) => void }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectAddress: FC<Props> = ({ onValidAddress }) => {
  const intl = useAltIntl()
  const [step, setStep] = useState(0)

  const [smartAddress, setSmartAddress] = useState<
    Partial<WorldAddress> | undefined
  >()

  return (
    <div>
      <Steps current={step}>
        <Step title={intl.formatMessage({ id: 'address.searchFor' })} />
        <Step title={intl.formatMessage({ id: 'address.confirm' })} />
      </Steps>
      {step === 0 && (
        <div>
          <SmartAddress
            onAddress={(data) => {
              setSmartAddress(data)
              setStep(1)
            }}
          />
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-column pt2">
          <div className="pa2 mb2" style={{ border: '1px solid #d9d9d9' }}>
            <AddressDisplay address={smartAddress} />
          </div>
          <Form layout="vertical" className="mt2">
            <div className="flex justify-between">
              <Form.Item
                name="number"
                className="w-30"
                label={intl.formatMessage({ id: 'address.number' })}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="complement"
                className="w-60"
                label={intl.formatMessage({ id: 'address.complement' })}
              >
                <Input
                  size="large"
                  placeholder={intl.formatMessage({
                    id: 'address.complementPlaceholder',
                  })}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="complement"
              className="w-100"
              label={intl.formatMessage({ id: 'addsess.aditionalInfo' })}
            >
              <Input
                size="large"
                placeholder={intl.formatMessage({
                  id: 'address.aditionalInfo.placeholder',
                })}
              />
            </Form.Item>
          </Form>
          <Button block type="primary" onClick={() => {}}>
            {intl.formatMessage({ id: 'address.select' })}
          </Button>
        </div>
      )}
    </div>
  )
}

export default SelectAddress
