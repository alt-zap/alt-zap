import React, { FC, useCallback, useState } from 'react'
import { Button, Form, Input, Steps } from 'antd'

import { WorldAddress } from '../../typings'
import SmartAddress from '../tenant/logistics/SmartAddress'
import AddressDisplay from './AddressDisplay'
import {
  IntlRules,
  prepareRules,
  TypedIntlRules,
  useAltIntl,
} from '../../intlConfig'

const { Step } = Steps

type FormValues = {
  number: string
  complement?: string
  additionalInfo: string
}

type Props = { onValidAddress: (address: WorldAddress) => void }

const intlRules: TypedIntlRules<WorldAddress> = {
  number: [{ required: true, message: 'address.numberRule' }],
  additionalInfo: [{ required: true, message: 'address.additionalInfoRule' }],
}

const SelectAddress: FC<Props> = ({ onValidAddress }) => {
  const [form] = Form.useForm()
  const intl = useAltIntl()
  const [step, setStep] = useState(0)

  const rules = prepareRules(intlRules as IntlRules, intl)

  const [smartAddress, setSmartAddress] = useState<
    Partial<WorldAddress> | undefined
  >()

  const onSmartSelect = useCallback(
    (data: Partial<WorldAddress>) => {
      setSmartAddress(data)
      data.number && form.setFieldsValue({ number: data.number })
      setStep(1)
    },
    [setSmartAddress, setStep, form]
  )

  const onSubmitForm = useCallback(
    (values: FormValues) => {
      const returnedAddress = {
        ...(smartAddress as WorldAddress),
        ...(values as Partial<WorldAddress>),
      }

      onValidAddress(returnedAddress)
    },
    [smartAddress, onValidAddress]
  )

  return (
    <div>
      <Steps current={step}>
        <Step title={intl.formatMessage({ id: 'address.searchFor' })} />
        <Step title={intl.formatMessage({ id: 'address.confirm' })} />
      </Steps>
      {step === 0 && (
        <div className="mt3">
          <SmartAddress onAddress={onSmartSelect} />
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-column pt2 mt3">
          <div
            className="pa2 mb2 bg-light-gray"
            style={{ border: '1px solid #d9d9d9' }}
          >
            <AddressDisplay address={smartAddress} />
          </div>
          <Form
            layout="vertical"
            className="mt2"
            form={form}
            onFinish={(data) => onSubmitForm(data as FormValues)}
          >
            <div className="flex justify-between">
              <Form.Item
                rules={rules.number}
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
              name="additionalInfo"
              rules={rules.additionalInfo}
              className="w-100"
              label={intl.formatMessage({ id: 'address.additionalInfo' })}
            >
              <Input
                size="large"
                placeholder={intl.formatMessage({
                  id: 'address.additionalInfo.placeholder',
                })}
              />
            </Form.Item>
            <div className="flex justify-between">
              <Button
                className="w-30 mr3"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => setStep(0)}
              >
                {intl.formatMessage({ id: 'address.selectAddress.back' })}
              </Button>

              <Button
                className="w-60"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => {}}
              >
                {intl.formatMessage({ id: 'address.select' })}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  )
}

export default SelectAddress
