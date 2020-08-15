import React, { FC } from 'react'
import { Button, Form, Input } from 'antd'
import InputMask from 'react-input-mask'

import {
  Message,
  useAltIntl,
  IntlRules,
  prepareRules,
} from '../../../intlConfig'

const { Item, useForm } = Form

const intlRules: IntlRules = {
  name: [
    {
      required: true,
      message: 'onboard.user.nameRule',
    },
    {
      min: 10,
      message: 'onboard.user.nameRule',
    },
  ],
  document: [
    {
      required: true,
      message: 'onboard.user.documentRule',
    },
  ],
}

type Props = {
  initialValues?: object
  onSubmit: () => void
  loading?: boolean
}

const UserForm: FC<Props> = ({ initialValues, onSubmit, loading }) => {
  const intl = useAltIntl()
  const rules = prepareRules(intlRules, intl)
  const [form] = useForm()

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Item
        name="name"
        label={<Message id="onboard.user.name" />}
        rules={rules.name}
      >
        <Input size="large" />
      </Item>
      <Item
        name="document"
        label={<Message id="onboard.user.document" />}
        rules={[
          ...rules.document,
          () => ({
            validator: (_, value) => {
              const numbers =
                value?.replace(/\./g, '').replace(/-/g, '').replace(/_/g, '') ??
                ''

              if (numbers.length < 11) {
                return Promise.reject(
                  intl.formatMessage({ id: 'onboard.user.documentRule' })
                )
              }

              return Promise.resolve()
            },
          }),
        ]}
      >
        <InputMask
          disabled={loading}
          mask={intl.formatMessage({ id: 'onboard.user.documentMask' })}
        >
          <Input size="large" />
        </InputMask>
      </Item>
      <Button
        loading={loading}
        size="large"
        type="primary"
        block
        htmlType="submit"
      >
        <Message id="save" />
      </Button>
    </Form>
  )
}

export default UserForm
