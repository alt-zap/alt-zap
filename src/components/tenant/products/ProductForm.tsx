/* eslint-disable no-console */
import React, { FC } from 'react'
import {
  ConfigProvider,
  Button,
  Form,
  Switch,
  Select,
  Divider,
  InputNumber,
  List,
} from 'antd'
import { Rule } from 'antd/lib/form'
import ptBR from 'antd/es/locale/pt_BR'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import TextInput from '../../common/TextInput'
import ImageUpload from '../../common/ImageUpload'
import TextareaInput from '../../common/TextareaInput'
import { useTenantConfig } from '../../../contexts/TenantContext'
import CurrencyInput from '../../common/CurrencyInput'

const { Item } = Form
const { Option } = Select

const NumberInput: FC<React.ComponentPropsWithoutRef<typeof InputNumber>> = (
  props
) => (
  <InputNumber
    size="large"
    className="fw1"
    spellCheck="false"
    autoComplete="off"
    {...props}
  />
)

const PriceInput: FC<React.ComponentPropsWithoutRef<typeof CurrencyInput>> = (
  props
) => (
  <CurrencyInput
    addonBefore="R$"
    size="large"
    className="fw1"
    spellCheck="false"
    autoComplete="off"
    {...props}
  />
)

const labelFor = (label: string) => <span className="f4 fw1">{label}</span>

type ProductData = Pick<Product, 'id' | 'name' | 'live'>

type Props = {
  initialData?: Partial<ProductData>
  onValidSubmit?: (data: ProductData) => void
  loading?: boolean
  editMode?: boolean
}

const rules: Record<string, Rule[]> = {
  required: [
    {
      required: true,
      message: 'Esse campo é obrigatório',
    },
  ],
  name: [
    {
      required: true,
      message: 'Você deve preencher o nome do produto',
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
  category: [
    {
      required: true,
      message: 'Você deve selecionar uma categoria para o produto',
    },
  ],
  logoSrc: [
    {
      required: true,
      message: 'Você deve adicionar ou fazer o upload de uma logomarca',
    },
  ],
  price: [
    {
      required: true,
      message: 'Você deve informar um preço',
    },
  ],
  assemblyName: [
    { required: true, message: 'Você deve informar o nome do item' },
  ],
}

const assemblyOptionsTypes = [
  {
    label: 'Seleção Única',
    name: 'UNISELECT',
  },
  {
    label: 'Múltipla Escolha',
    name: 'MULTISELECT',
  },
  {
    label: 'Texto Livre',
    name: 'TEXT',
  },
]

// https://www.npmjs.com/package/react-currency-masked-input ??
const ProductForm: FC<Props> = ({
  editMode,
  onValidSubmit,
  loading,
  initialData,
}) => {
  const [form] = Form.useForm()
  const { categories } = useTenantConfig()

  return (
    <ConfigProvider locale={ptBR}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(store) => onValidSubmit?.(store as ProductData)}
        initialValues={initialData}
      >
        <div className="flex justify-between">
          <div className="w-80">
            <Item label={labelFor('Nome')} name="name" rules={rules.name}>
              <TextInput disabled={loading} />
            </Item>
          </div>
          <div>
            <Form.Item
              label={labelFor('Disponível')}
              name="live"
              valuePropName="checked"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Switch />
            </Form.Item>
          </div>
        </div>
        <Item
          name="select"
          label={labelFor('Categoria')}
          rules={rules.category}
        >
          <Select size="large" placeholder="Selecione a categoria">
            {categories?.map(({ name, id }) => (
              <Option value={id} key={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          label={labelFor('Descrição')}
          name="description"
          rules={rules.description}
        >
          <TextareaInput disabled={loading} />
        </Item>

        <Item
          label={labelFor('Logomarca')}
          name="logoSrc"
          rules={rules.logoSrc}
        >
          <ImageUpload large />
        </Item>

        <Divider>Exibição</Divider>

        <div className="flex justify-around">
          <div>
            <Item label={labelFor('Modo de Exibição')}>
              <Select
                defaultValue="Horizontal"
                size="large"
                placeholder="Selecione a categoria"
                disabled
              />
            </Item>
          </div>
          <div>
            <Form.Item
              label={labelFor('Destaque')}
              name="highlight"
              valuePropName="checked"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Switch />
            </Form.Item>
          </div>
        </div>
        <Divider>Oferta</Divider>

        <div className="flex justify-center justify-between-l flex-wrap">
          <div className="w-70 w-50-l pr3">
            <Item
              label={labelFor('Preço Base')}
              name="price"
              rules={rules.price}
            >
              <PriceInput />
            </Item>
          </div>
          <div className="flex justify-around flex-auto w-100 w-auto-l">
            <div className="w-30 w-50-l">
              <Item label={labelFor('Mínimo')} name="min" rules={rules.min}>
                <NumberInput disabled={loading} />
              </Item>
            </div>
            <div className="w-30 w-50-l">
              <Item label={labelFor('Máximo')} name="max" rules={rules.max}>
                <NumberInput disabled={loading} />
              </Item>
            </div>
          </div>
        </div>

        <Divider>Opções de Montagem</Divider>

        <Form.List name="assemblyOptions">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <div
                    key={`${field.key}`}
                    className="flex flex-column bg-light-gray br3 bw1 pa2 mt2"
                  >
                    <div className="flex justify-between">
                      <div className="w-70">
                        <Form.Item
                          {...field}
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          rules={rules.assemblyName}
                          label={labelFor('Nome do Item')}
                        >
                          <TextInput placeholder="ex: Sabor" />
                        </Form.Item>
                      </div>
                      <div className="w-20">
                        <Form.Item
                          {...field}
                          name={[field.name, 'live']}
                          fieldKey={[field.fieldKey, 'live']}
                          valuePropName="checked"
                          rules={rules.required}
                          label={labelFor('Ativo')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Switch />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-50">
                        <Item
                          label={labelFor('Preço')}
                          name={[field.name, 'price']}
                          fieldKey={[field.fieldKey, 'price']}
                        >
                          <PriceInput />
                        </Item>
                      </div>
                      <div className="w-50">
                        <Item
                          {...field}
                          name={[field.name, 'type']}
                          fieldKey={[field.fieldKey, 'type']}
                          label={labelFor('Tipo')}
                          rules={rules.required}
                        >
                          <Select size="large" placeholder="Selecione o tipo">
                            {assemblyOptionsTypes?.map(({ name, label }) => (
                              <Option value={name} key={name}>
                                {label}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                      </div>
                    </div>
                    <div className="flex justify-around flex-auto w-100 w-auto-l">
                      <div className="w-30 w-50-l">
                        <Item
                          label={labelFor('Mínimo')}
                          name={[field.name, 'min']}
                          fieldKey={[field.fieldKey, 'min']}
                          rules={rules.required}
                        >
                          <NumberInput disabled={loading} />
                        </Item>
                      </div>
                      <div className="w-30 w-50-l">
                        <Item
                          label={labelFor('Máximo')}
                          name={[field.name, 'max']}
                          fieldKey={[field.fieldKey, 'max']}
                          rules={rules.max}
                        >
                          <NumberInput disabled={loading} />
                        </Item>
                      </div>
                    </div>
                    <Divider orientation="left">Opções</Divider>
                    <div>
                      <Form.List name={[field.name, 'options']}>
                        {(optionFields, { add: optionAdd }) => {
                          return (
                            <div>
                              {optionFields.map((optionField) => (
                                <div key={`${field.key}-${optionField.key}`}>
                                  <Form.Item
                                    {...optionField}
                                    name={[optionField.name, 'first']}
                                    fieldKey={[optionField.fieldKey, 'first']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing first name',
                                      },
                                    ]}
                                  >
                                    <TextInput placeholder="First Name" />
                                  </Form.Item>
                                  <Form.Item
                                    {...optionField}
                                    name={[optionField.name, 'last']}
                                    fieldKey={[optionField.fieldKey, 'last']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing last name',
                                      },
                                    ]}
                                  >
                                    <TextInput placeholder="Last Name" />
                                  </Form.Item>
                                </div>
                              ))}

                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => {
                                    optionAdd()
                                  }}
                                  block
                                >
                                  <PlusOutlined /> Add option
                                </Button>
                              </Form.Item>
                            </div>
                          )
                        }}
                      </Form.List>
                    </div>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    block
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            )
          }}
        </Form.List>
        <List dataSource={[]} bordered />

        <Button
          loading={loading}
          size="large"
          type="primary"
          block
          htmlType="submit"
        >
          {`${editMode ? 'Salvar' : 'Adicionar'}`}
        </Button>
      </Form>
    </ConfigProvider>
  )
}

export default ProductForm

// <div className="flex flex-col justify-center">
//   <MinusCircleOutlined
//     onClick={() => {
//       remove(field.name)
//     }}
//   />
// </div>
