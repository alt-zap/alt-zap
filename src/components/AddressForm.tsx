/* eslint-disable no-console */
import React, { FC, useCallback, Fragment } from 'react'
import { Button, Form } from 'antd'

import AutoFill from './AutoFill'
import AddressFields from './common/AddressFields'
import { WorldAddress } from '../typings'
import { TypedIntlRules, Message } from '../intlConfig'

type Props = {
  initialAddress?: Partial<Address>
  onAddress?: (data: Address) => void
  onValidSubmit?: (data: Address) => void
  loading?: boolean
}

const rules: TypedIntlRules<WorldAddress> = {
  street: [{ required: true, message: 'address.streetRule' }],
  number: [{ required: true, message: 'address.numberRule' }],
  district: [{ required: true, message: 'address.districtRule' }],
  city: [{ required: true, message: 'address.cityRule' }],
  state: [{ required: true, message: 'address.stateRule' }],
}

const AddressForm: FC<Props> = ({
  onAddress,
  onValidSubmit,
  loading,
  initialAddress = {},
}) => {
  const [form] = Form.useForm()

  const handleAutoFill = useCallback(
    (data: Partial<WorldAddress>) => {
      form.setFieldsValue({ ...data })
    },
    [form]
  )

  return (
    <Fragment>
      <AutoFill onAddress={handleAutoFill} />
      <Form
        form={form}
        layout="vertical"
        onFinish={(data) => onValidSubmit?.(data)}
        initialValues={initialAddress}
        onFieldsChange={(_, all) => {
          if (!onAddress) return

          const address = all.reduce(
            (acc, { name, value }) => ({
              ...acc,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              [(name as any)[0]]: value,
            }),
            {}
          )

          onAddress(address)
        }}
      >
        <div id="endereco" className="flex flex-column items-center mt2">
          <AddressFields rules={rules} />
          <Button
            loading={loading}
            size="large"
            type="primary"
            block
            htmlType="submit"
          >
            <Message id="address.form.save" />
          </Button>
        </div>
      </Form>
      <div />
    </Fragment>
  )
}

export default AddressForm
