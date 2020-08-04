/* eslint-disable react/jsx-handler-names */
import React, { FC, useMemo } from 'react'
import { Form, Button, Select } from 'antd'
import slugify from 'slugify'
import InputMask from 'react-input-mask'

import ImageUpload from '../common/ImageUpload'
import ColorPicker from '../common/ColorPicker'
import TextInput from '../common/TextInput'
import {
  Message,
  useAltIntl,
  IntlRules,
  IntlSelect,
  prepareRules,
  prepareSelect,
} from '../../intlConfig'

const { Item } = Form
const { Option } = Select

type TenantMetadata = Pick<
  TenantConfig,
  'name' | 'slug' | 'whatsapp' | 'instagram' | 'logoSrc' | 'color'
>

type Props = {
  loading?: boolean
  initialData?: TenantMetadata
  onSubmit?: (data: TenantMetadata) => void
}

const intlRules: IntlRules = {
  name: [
    {
      required: true,
      message: 'tenant.data.nameRequired',
    },
    {
      min: 4,
      message: 'tenant.data.nameMin',
    },
    {
      max: 30,
      message: 'tenant.data.nameMax',
    },
  ],
  slug: [
    {
      required: true,
      message: 'tenant.data.slugRequired',
    },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/g,
      message: 'tenant.data.slugPattern',
    },
  ],
  whatsapp: [{ required: true, message: 'tenant.data.whatsappRequired' }],
  instagram: [
    {
      pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/g,
      message: 'tenant.data.instagramPattern',
    },
  ],
  required: [
    {
      required: true,
      message: 'mandatoryField',
    },
  ],
}

const intlCategories: IntlSelect = [
  {
    name: 'tenant.category.hamburgueria',
    value: 'hamburgueria',
  },
  {
    name: 'tenant.category.pizzaria',
    value: 'pizzaria',
  },
  {
    name: 'tenant.category.loja',
    value: 'loja',
  },
  {
    name: 'tenant.category.restaurante',
    value: 'restaurante',
  },
]

const TenantDataForm: FC<Props> = ({ initialData }) => {
  const intl = useAltIntl()
  const rules = useMemo(() => prepareRules(intlRules, intl), [intl])
  const categories = useMemo(() => prepareSelect(intlCategories, intl), [intl])

  const [form] = Form.useForm()

  return (
    // eslint-disable-next-line no-console
    <Form
      form={form}
      layout="vertical"
      // eslint-disable-next-line no-console
      onFinish={console.log}
      initialValues={initialData}
    >
      <Item label={<Message id="tenant.name" />} name="name" rules={rules.name}>
        <TextInput />
      </Item>
      <Item label={<Message id="tenant.url" />} name="slug" rules={rules.slug}>
        <TextInput
          addonBefore="https://"
          addonAfter=".alt.app.br"
          onFocus={() => {
            const { name, slug } = form.getFieldsValue()

            if (name && !slug) {
              form.setFieldsValue({ slug: slugify(name, { lower: true }) })
            }
          }}
        />
      </Item>
      <Item
        label={<Message id="tenant.category" />}
        name="category"
        rules={rules.required}
      >
        <Select
          size="large"
          placeholder={<Message id="tenant.categoryPlaceholder" />}
        >
          {categories?.map(({ name, value }) => (
            <Option value={value} key={value}>
              {name}
            </Option>
          ))}
        </Select>
      </Item>
      <div className="flex">
        <div className="w-50 mr1">
          <Item
            label={<Message id="tenant.whatsapp" />}
            name="whatsapp"
            rules={rules.whatsapp}
          >
            <InputMask mask="+55 (99) 99999-9999">
              <TextInput
                placeholder={intl.formatMessage({
                  id: 'tenant.whatsappPlaceholder',
                })}
              />
            </InputMask>
          </Item>
        </div>
        <div className="w-50 mr1">
          <Item
            label={<Message id="tenant.instagram" />}
            name="instagram"
            rules={rules.instagram}
          >
            <TextInput addonBefore="@" />
          </Item>
        </div>
      </div>
      <Item
        label={<Message id="tenant.logoSrc" />}
        name="logoSrc"
        rules={rules.logoSrc}
      >
        <ImageUpload large />
      </Item>
      <Item
        label={<Message id="tenant.color" />}
        name="color"
        rules={rules.color}
      >
        <ColorPicker />
      </Item>
      <Button size="large" type="primary" block htmlType="submit">
        <Message id="save" />
      </Button>
    </Form>
  )
}

export default TenantDataForm
