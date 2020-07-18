/* eslint-disable react/jsx-handler-names */
import React, { FC } from 'react'
import { Form, Button, Input } from 'antd'
import slugify from 'slugify'
import { Rule } from 'antd/lib/form'

import ImageUpload from '../common/ImageUpload'
import ColorPicker from '../common/ColorPicker'

const { Item } = Form

const TextInput: FC<React.ComponentPropsWithoutRef<typeof Input>> = (props) => (
  <Input
    size="large"
    className="fw1"
    spellCheck="false"
    autoComplete="off"
    {...props}
  />
)

type TenantMetadata = Pick<
  TenantConfig,
  'name' | 'slug' | 'whatsapp' | 'instagram' | 'logoSrc' | 'color'
>

type Props = {
  loading?: boolean
  initialData?: TenantMetadata
  onSubmit?: (data: TenantMetadata) => void
}

const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: 'Você deve preencher o nome do negócio',
    },
    {
      min: 4,
      message: 'O nome deve ter pelo menos 4 caracteres',
    },
    {
      max: 30,
      message: 'O nome deve ter no máximo 30 caracteres',
    },
  ],
  slug: [
    {
      required: true,
      message: 'Você deve preencher a URL',
    },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/g,
      message: 'A URL não pode ter caracteres especiais',
    },
  ],
  whatsapp: [{ required: true, message: 'Você deve preencher o Whatsapp' }],
  instagram: [
    {
      pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/g,
      message: 'Forneça um usuário válido',
    },
  ],
}

const labelFor = (label: string) => <span className="f4 fw1">{label}</span>

const TenantDataForm: FC<Props> = ({ initialData }) => {
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
      <Item
        label={labelFor('Nome do seu negócio')}
        name="name"
        rules={rules.name}
      >
        <TextInput />
      </Item>
      <Item
        label={labelFor('URL da sua página')}
        name="slug"
        rules={rules.slug}
      >
        <TextInput
          addonBefore="https://alt-zap.vercel.app/"
          onFocus={() => {
            const { name, slug } = form.getFieldsValue()

            if (name && !slug) {
              form.setFieldsValue({ slug: slugify(name, { lower: true }) })
            }
          }}
        />
      </Item>
      <div className="flex">
        <div className="w-50 mr1">
          <Item
            label={labelFor('Whatsapp')}
            name="whatsapp"
            rules={rules.whatsapp}
          >
            <TextInput placeholder="ex: (83) 99934-2545" />
          </Item>
        </div>
        <div className="w-50 mr1">
          <Item
            label={labelFor('Instagram')}
            name="instagram"
            rules={rules.instagram}
          >
            <TextInput addonBefore="@" />
          </Item>
        </div>
      </div>
      <Item label={labelFor('Logomarca')} name="logoSrc" rules={rules.logoSrc}>
        <ImageUpload large />
      </Item>
      <Item label={labelFor('Cor do Tema')} name="color" rules={rules.color}>
        <ColorPicker />
      </Item>
      <Button size="large" type="primary" block htmlType="submit">
        Enviar
      </Button>
    </Form>
  )
}

export default TenantDataForm
