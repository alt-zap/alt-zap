/* eslint-disable no-console */
import React, { FC, Fragment } from 'react'
import { Button, Form, Collapse } from 'antd'

import AddressFields from './common/AddressFields'
import { WorldAddress } from '../typings'
import { TypedIntlRules, Message, useAltIntl } from '../intlConfig'
import SmartAddress from './tenant/logistics/SmartAddress'

type Props = {
  initialAddress?: Partial<WorldAddress>
  onValidSubmit?: (data: WorldAddress) => void
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
  onValidSubmit,
  loading,
  initialAddress = {},
}) => {
  const [form] = Form.useForm()

  const { Panel } = Collapse

  const intl = useAltIntl()

  return (
    <Fragment>
      <SmartAddress
        onAddress={(data) => onValidSubmit?.(data as WorldAddress)}
      />
      <Collapse ghost className="mt2">
        <Panel
          header={intl.formatMessage({
            id: 'address.collapseMessage',
          })}
          key="1"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={(data) => onValidSubmit?.(data as WorldAddress)}
            initialValues={initialAddress}
          >
            <div id="address" className="flex flex-column items-center mt2">
              <AddressFields rules={rules} />
            </div>
            <Button
              className="mt3"
              loading={loading}
              size="large"
              type="primary"
              block
              htmlType="submit"
            >
              <Message id="address.form.save" />
            </Button>
          </Form>
        </Panel>
      </Collapse>

      <div />
    </Fragment>
  )
}

export default AddressForm
