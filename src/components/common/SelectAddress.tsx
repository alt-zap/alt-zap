/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useState } from 'react'
import { Alert, Button, Form, Input, Steps } from 'antd'

import { WorldAddress } from '../../typings'
import SmartAddress from '../tenant/logistics/SmartAddress'
import AddressDisplay from './AddressDisplay'
import {
  IntlRules,
  prepareRules,
  TypedIntlRules,
  useAltIntl,
} from '../../intlConfig'
import AddressFields from './AddressFields'
import { rules as addressRules } from '../AddressForm'

const { Step } = Steps

type FormValues = {
  number: string
  complement?: string
  additionalInfo: string
}

type Props = {
  onValidAddress: (address: WorldAddress) => void
  allowManual?: boolean
}

const intlRules: TypedIntlRules<WorldAddress> = {
  number: [{ required: true, message: 'address.numberRule' }],
  additionalInfo: [{ required: true, message: 'address.additionalInfoRule' }],
}

const SelectAddress: FC<Props> = ({ onValidAddress, allowManual }) => {
  const [form] = Form.useForm()
  const intl = useAltIntl()
  const [step, setStep] = useState(0)
  const [manual, setManual] = useState(false)

  const rules = prepareRules(intlRules as IntlRules, intl)
  const manualRules = prepareRules(addressRules as IntlRules, intl)

  const [smartAddress, setSmartAddress] = useState<
    Partial<WorldAddress> | undefined
  >()

  const onSmartSelect = useCallback(
    (data: Partial<WorldAddress>) => {
      setSmartAddress(data)
      form.setFieldsValue({
        number: data?.number ?? '',
        complement: data?.complement ?? '',
      })
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
          {!manual && <SmartAddress onAddress={onSmartSelect} />}
          {manual && (
            <Alert
              type="info"
              className="mb2"
              message={intl.formatMessage({
                id: 'selectAddress.warningManual',
              })}
            />
          )}
          <div className="flex justify-center tc">
            {!manual && allowManual && (
              <span className="tc">
                {intl.formatMessage({ id: 'or' })}{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setManual(true)
                  }}
                >
                  {intl.formatMessage({ id: 'selectAddress.fillManually' })}
                </a>
              </span>
            )}
            {manual && (
              <span className="tc">
                <a
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setManual(false)
                  }}
                >
                  {intl.formatMessage({ id: 'selectAddress.backToSeach' })}
                </a>
              </span>
            )}
          </div>
          {manual && (
            <Form
              layout="vertical"
              className="mt2"
              onFinish={(data) => {
                onSmartSelect(data)
              }}
            >
              <div id="address" className="flex flex-column items-center mt2">
                <AddressFields rules={manualRules} />
              </div>
              <Button
                className="mt3"
                size="large"
                type="primary"
                block
                htmlType="submit"
              >
                {intl.formatMessage({ id: 'proceed' })}
              </Button>
            </Form>
          )}
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
