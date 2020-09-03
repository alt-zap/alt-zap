/* eslint-disable no-console */
import React, { FC, useMemo } from 'react'
import { Button, Form, Switch } from 'antd'
import slugify from 'slugify'

import TextInput from '../../common/TextInput'
import { Category } from '../../../typings'
import {
  Message,
  useAltIntl,
  IntlRules,
  prepareRules,
} from '../../../intlConfig'

const { Item } = Form

type CategoryData = Pick<Category, 'id' | 'name' | 'live' | 'slug'>

type Props = {
  initialData?: Partial<CategoryData>
  onValidSubmit: (data: CategoryData) => void
  loading?: boolean
  editMode?: boolean
}

const rules: IntlRules = {
  name: [
    {
      required: true,
      message: 'tenant.categories.nameRequired',
    },
    {
      min: 4,
      message: 'tenant.categories.nameMin',
    },
    {
      max: 30,
      message: 'tenant.categories.nameMax',
    },
  ],
}

const CategoryForm: FC<Props> = ({
  editMode,
  onValidSubmit,
  loading,
  initialData,
}) => {
  const intl = useAltIntl()
  const intlRules = useMemo(() => prepareRules(rules, intl), [intl])

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(store) => onValidSubmit(store as CategoryData)}
      initialValues={initialData}
    >
      <Item
        label={<Message id="tenant.categories.name" />}
        name="name"
        rules={intlRules.name}
      >
        <TextInput
          disabled={loading}
          onChange={(e) => {
            const name = e.target.value

            if (name) {
              form.setFieldsValue({ slug: slugify(name, { lower: true }) })
            }
          }}
        />
      </Item>
      <Item label={<Message id="tenant.slug" />} name="slug">
        <TextInput disabled />
      </Item>
      <Form.Item
        label={<Message id="tenant.categories.live" />}
        name="live"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Button
        loading={loading}
        size="large"
        type="primary"
        block
        htmlType="submit"
      >
        {intl.formatMessage({ id: editMode ? 'save' : 'add' })}
      </Button>
    </Form>
  )
}

export default CategoryForm
