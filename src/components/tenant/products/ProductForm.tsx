/* eslint-disable no-console */
import React, { FC } from 'react'
import {
  Button,
  Form,
  Switch,
  Select,
  Divider,
  InputNumber,
  Tooltip,
} from 'antd'
import { Rule } from 'antd/lib/form'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import TextInputOriginal from '../../common/TextInput'
import ImageUploadOriginal from '../../common/ImageUpload'
import TextareaInputOriginal from '../../common/TextareaInput'
import CurrencyInput from '../../common/CurrencyInput'
import { Category, Product } from '../../../typings'

const { Item } = Form
const { Option } = Select

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function forwardRef<Props>(Component: FC<Props>, extraProps?: any) {
  return React.forwardRef<HTMLDivElement, Props>(function WrappedComp(
    props,
    ref
  ) {
    return (
      <div ref={ref}>
        <Component {...extraProps} {...props} />
      </div>
    )
  })
}

const TextareaInput = forwardRef<
  React.ComponentPropsWithoutRef<typeof TextareaInputOriginal>
>(TextareaInputOriginal)

const TextInput = forwardRef<
  React.ComponentPropsWithoutRef<typeof TextInputOriginal>
>(TextInputOriginal)

const LogoUpload = forwardRef<
  React.ComponentPropsWithoutRef<typeof ImageUploadOriginal>
>(ImageUploadOriginal)

const PriceInput = forwardRef<
  React.ComponentPropsWithoutRef<typeof CurrencyInput>
>(CurrencyInput, {
  addonBefore: 'R$',
  size: 'large',
  className: 'fw1',
  spellCheck: 'false',
})

const NumberInput = forwardRef<
  React.ComponentPropsWithoutRef<typeof InputNumber>
>(InputNumber, {
  size: 'large',
  className: 'fw1',
  spellCheck: 'false',
})

const labelFor = (label: string) => label

type ProductData = Pick<Product, 'id' | 'name' | 'live'>

type Props = {
  initialData?: Partial<Product>
  categories: Category[]
  onValidSubmit?: (data: Product) => void
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

const ProductForm: FC<Props> = ({
  editMode,
  categories,
  onValidSubmit,
  loading,
  initialData,
}) => {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(store) => onValidSubmit?.(store as Product)}
      initialValues={initialData}
      autoComplete="off"
      scrollToFirstError
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
        name="category"
        label={labelFor('Categoria')}
        rules={rules.category}
      >
        <Select size="large" placeholder="Selecione a categoria">
          {categories?.map(({ name }, index) => (
            <Option value={index} key={index}>
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

      <Item label={labelFor('Imagem')} name="imgSrc">
        <LogoUpload large />
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
        <div className="w-50 pr3">
          <Item label={labelFor('Preço Base')} name="price" rules={rules.price}>
            <PriceInput />
          </Item>
        </div>
        <div className="flex justify-around flex-auto w-100 w-auto-l">
          <Item label={labelFor('Mínimo')} name="min" rules={rules.min}>
            <NumberInput disabled={loading} />
          </Item>
          <Item label={labelFor('Máximo')} name="max" rules={rules.max}>
            <NumberInput disabled={loading} />
          </Item>
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
                        label={labelFor('Nome do Campo')}
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
                        initialValue
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
                    <div className="w-50 pr2">
                      <Item
                        label={labelFor('Preço')}
                        name={[field.name, 'price']}
                        fieldKey={[field.fieldKey, 'price']}
                      >
                        <PriceInput />
                      </Item>
                    </div>
                    <div className="w-50 pl2">
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
                    <Item
                      label={labelFor('Mínimo')}
                      name={[field.name, 'min']}
                      fieldKey={[field.fieldKey, 'min']}
                      rules={rules.required}
                    >
                      <NumberInput disabled={loading} />
                    </Item>
                    <Item
                      label={labelFor('Máximo')}
                      name={[field.name, 'max']}
                      fieldKey={[field.fieldKey, 'max']}
                      rules={rules.max}
                    >
                      <NumberInput disabled={loading} />
                    </Item>
                  </div>
                  <Divider orientation="left">Opções</Divider>
                  <div>
                    <Form.List name={[field.name, 'options']}>
                      {(
                        optionFields,
                        { add: optionAdd, remove: optionRemove }
                      ) => {
                        return (
                          <div>
                            {optionFields.map((optionField) => (
                              <div
                                key={`${field.key}-${optionField.key}`}
                                className="bg-white br3 flex flex-column pa3 mt2"
                              >
                                <div className="flex justify-between">
                                  <div className="w-70">
                                    <Form.Item
                                      {...optionField}
                                      name={[optionField.name, 'name']}
                                      fieldKey={[optionField.fieldKey, 'name']}
                                      rules={rules.required}
                                      label="Nome da Opção"
                                    >
                                      <TextInput placeholder="ex: Calabresa" />
                                    </Form.Item>
                                  </div>
                                  <div className="w-20">
                                    <Form.Item
                                      {...optionField}
                                      name={[optionField.name, 'live']}
                                      fieldKey={[optionField.fieldKey, 'live']}
                                      valuePropName="checked"
                                      rules={rules.required}
                                      label="Ativo"
                                      initialValue
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Switch />
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="w-100">
                                  <Form.Item
                                    {...optionField}
                                    name={[optionField.name, 'description']}
                                    fieldKey={[
                                      optionField.fieldKey,
                                      'description',
                                    ]}
                                    label="Descrição"
                                  >
                                    <TextInput placeholder="Ex: Contém Lactose" />
                                  </Form.Item>
                                </div>
                                <div className="flex justify-around">
                                  <div className="w-40 pr3">
                                    <Form.Item
                                      {...optionField}
                                      name={[optionField.name, 'price']}
                                      fieldKey={[optionField.fieldKey, 'price']}
                                      label="Preço"
                                    >
                                      <PriceInput />
                                    </Form.Item>
                                  </div>
                                  <div className="w-40">
                                    <Form.Item
                                      {...optionField}
                                      name={[
                                        optionField.name,
                                        'initialQuantity',
                                      ]}
                                      fieldKey={[
                                        optionField.fieldKey,
                                        'initialQuantity',
                                      ]}
                                      label="Quantidade Inicial"
                                    >
                                      <NumberInput />
                                    </Form.Item>
                                  </div>
                                </div>

                                <div className="flex justify-center">
                                  <Tooltip title="Remover Item">
                                    <Button
                                      danger
                                      onClick={() =>
                                        optionRemove(optionField.name)
                                      }
                                      onKeyPress={() =>
                                        optionRemove(optionField.name)
                                      }
                                      shape="circle"
                                      icon={<DeleteOutlined />}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            ))}

                            <div className="mt3">
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => {
                                    optionAdd()
                                  }}
                                  block
                                >
                                  <PlusOutlined /> Adicionar Opção
                                </Button>
                              </Form.Item>
                            </div>
                            <div className="flex justify-center">
                              <Tooltip title="Remover Item">
                                <Button
                                  danger
                                  type="primary"
                                  onClick={() => remove(field.name)}
                                  onKeyPress={() => remove(field.name)}
                                  shape="circle"
                                  icon={<DeleteOutlined />}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        )
                      }}
                    </Form.List>
                  </div>
                </div>
              ))}
              <div className="mt3">
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    block
                  >
                    <PlusOutlined /> Adicionar Campo
                  </Button>
                </Form.Item>
              </div>
            </div>
          )
        }}
      </Form.List>

      <Button
        loading={loading}
        size="large"
        type="primary"
        block
        htmlType="submit"
      >
        {`${editMode ? 'Salvar' : 'Adicionar Produto'}`}
      </Button>
    </Form>
  )
}

export default ProductForm
