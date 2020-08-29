/* eslint-disable react/jsx-handler-names */
import React, { FC, useMemo } from 'react'
import { Form, Button, Select } from 'antd'
import slugify from 'slugify'
import InputMask from 'react-input-mask'

import ImageUploadOriginal from '../common/ImageUpload'
import ColorPicker from '../common/ColorPicker'
import TextInputOriginal from '../common/TextInput'
import {
  Message,
  useAltIntl,
  IntlRules,
  IntlSelect,
  prepareRules,
  prepareSelect,
} from '../../intlConfig'
import { forwardRef } from './products/ProductForm'
import { TenantConfig } from '../../typings'

const { Item } = Form
const { Option } = Select

type TenantMetadata = Pick<
  TenantConfig,
  'name' | 'slug' | 'whatsapp' | 'instagram' | 'logoSrc' | 'color'
>

type Props = {
  loading?: boolean
  initialData?: TenantMetadata
  onSubmit?: (data: TenantMetadata) => Promise<void>
}

const ImageUpload = forwardRef<
  React.ComponentPropsWithoutRef<typeof ImageUploadOriginal>
>(ImageUploadOriginal)

const TextInput = forwardRef<
  React.ComponentPropsWithoutRef<typeof TextInputOriginal>
>(TextInputOriginal)

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

const TenantDataForm: FC<Props> = ({ initialData, onSubmit, loading }) => {
  const intl = useAltIntl()
  const rules = useMemo(() => prepareRules(intlRules, intl), [intl])
  const categories = useMemo(() => prepareSelect(intlCategories, intl), [intl])

  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(data) => {
        onSubmit?.(data as TenantConfig).then(() => {
          form.resetFields()
        })
      }}
      initialValues={initialData}
    >
      <Item label={<Message id="tenant.name" />} name="name" rules={rules.name}>
        <TextInput />
      </Item>
      <div className="flex flex-column flex-row-l">
        <div className="w-100 w-50-l mr1">
          <Item
            label={<Message id="tenant.url" />}
            name="slug"
            rules={rules.slug}
          >
            <TextInput
              disabled={loading}
              addonAfter=".alt.app.br"
              onFocus={() => {
                const { name, slug } = form.getFieldsValue()

                if (name && !slug) {
                  form.setFieldsValue({ slug: slugify(name, { lower: true }) })
                }
              }}
            />
          </Item>
        </div>
        <div className="w-100 w-50-l">
          <Item
            label={<Message id="tenant.category" />}
            name="category"
            rules={rules.required}
          >
            <Select
              disabled={loading}
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
        </div>
      </div>
      <div className="flex flex-column flex-row-l">
        <div className="w-100 w-50-l mr0 mr1-l">
          <Item
            label={<Message id="tenant.whatsapp" />}
            name="whatsapp"
            rules={rules.whatsapp}
          >
            <InputMask disabled={loading} mask="+55 (99) 99999-9999">
              <TextInput
                placeholder={intl.formatMessage({
                  id: 'tenant.whatsappPlaceholder',
                })}
              />
            </InputMask>
          </Item>
        </div>
        <div className="w-100 w-50-l mr0 mr1-l">
          <Item
            label={<Message id="tenant.instagram" />}
            name="instagram"
            rules={rules.instagram}
          >
            <TextInput disabled={loading} addonBefore="@" />
          </Item>
        </div>
      </div>
      <div className="flex flex-column flex-row-l">
        <div className="w-100 w-50-l">
          <Item
            label={<Message id="tenant.logoSrc" />}
            name="logoSrc"
            rules={rules.logoSrc}
          >
            <ImageUpload disabled={loading} large />
          </Item>
        </div>
        <div className="w-100 w-50-l pl0 pl4-l">
          <Item
            label={<Message id="tenant.color" />}
            name="color"
            rules={rules.color}
          >
            <ColorPicker />
          </Item>
        </div>
      </div>
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

export default TenantDataForm
