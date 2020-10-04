/* eslint-disable no-console */
import React, { FC, useMemo } from 'react'
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
import { Category, Product, AssemblyType } from '../../../typings'
import {
  Message,
  useAltIntl,
  IntlSelect,
  prepareSelect,
} from '../../../intlConfig'

const { Item } = Form
const { Option } = Select

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function forwardRef<Props>(Component: FC<Props>, extraProps?: any) {
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
  spellCheck: 'false',
})

const NumberInput = forwardRef<
  React.ComponentPropsWithoutRef<typeof InputNumber>
>(InputNumber, {
  size: 'large',
  spellCheck: 'false',
})

const labelFor = (label: string) => label

type Props = {
  initialData?: Partial<Product>
  categories: Category[]
  onValidSubmit?: (data: Product) => Promise<void>
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
  assemblyMax: [
    {
      required: true,
      message: 'Obrigatório',
    },
  ],
  assemblyMin: [
    {
      required: true,
      message: 'Obrigatório',
    },
  ],
}

const assemblyOptionsTypesIntl: IntlSelect<AssemblyType> = [
  {
    name: 'tenant.productform.assemblyRepeat',
    value: 'REPEAT',
  },
  {
    name: 'tenant.productform.assemblySimple',
    value: 'SINGLE',
  },
  // {
  //   name: 'tenant.productform.assemblyText',
  //   value: 'TEXT',
  // },
]

const ProductForm: FC<Props> = ({
  editMode,
  categories,
  onValidSubmit,
  loading,
  initialData,
}) => {
  const intl = useAltIntl()
  const [form] = Form.useForm()

  const assemblyOptionsTypes = useMemo(
    () => prepareSelect(assemblyOptionsTypesIntl, intl),
    [intl]
  )

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(store) => {
        onValidSubmit?.(store as Product).then(() => {
          form.resetFields()
        })
      }}
      initialValues={initialData}
      autoComplete="off"
      scrollToFirstError
    >
      <div className="flex justify-between">
        <div className="w-80">
          <Item
            label={<Message id="tenant.product.name" />}
            name="name"
            rules={rules.name}
          >
            <TextInput disabled={loading} />
          </Item>
        </div>
        <div>
          <Form.Item
            label={<Message id="tenant.product.live" />}
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
        label={<Message id="tenant.product.category" />}
        rules={rules.category}
      >
        <Select
          size="large"
          placeholder={<Message id="tenant.product.categoryPlaceholder" />}
        >
          {categories?.map(({ name }, index) => (
            <Option value={index} key={index}>
              {name}
            </Option>
          ))}
        </Select>
      </Item>
      <Item
        label={<Message id="tenant.product.description" />}
        name="description"
        rules={rules.description}
      >
        <TextareaInput disabled={loading} />
      </Item>

      <Item label={<Message id="tenant.product.imgSrc" />} name="imgSrc">
        <LogoUpload large />
      </Item>

      <Divider>
        <Message id="tenant.product.display" />
      </Divider>

      <div className="flex justify-around">
        <div>
          <Item label={<Message id="tenant.product.displayMode" />}>
            <Select defaultValue="Horizontal" size="large" disabled />
          </Item>
        </div>
        <div>
          <Form.Item
            label={<Message id="tenant.product.highlight" />}
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
      <Divider>
        <Message id="tenant.product.offer" />
      </Divider>

      <div className="flex justify-center justify-between-l flex-wrap">
        <div className="w-50 pr3">
          <Item
            label={<Message id="tenant.product.basePrice" />}
            name="price"
            rules={rules.price}
          >
            <PriceInput />
          </Item>
        </div>
        <div className="flex justify-around flex-auto w-100 w-auto-l">
          <Item
            label={<Message id="tenant.product.min" />}
            style={{ display: 'unset' }}
            name="min"
            rules={rules.min}
          >
            <NumberInput min={0} disabled={loading} />
          </Item>
          <Item
            style={{ display: 'unset' }}
            label={<Message id="tenant.product.max" />}
            name="max"
            rules={[
              ({ getFieldValue }) => ({
                validator: (_, value) => {
                  const otherMin = getFieldValue(['min'])

                  if (typeof otherMin === 'number' && otherMin > value) {
                    return Promise.reject(
                      intl.formatMessage({
                        id: 'tenant.productform.lessThenMin',
                      })
                    )
                  }

                  return Promise.resolve()
                },
              }),
            ]}
          >
            <NumberInput min={0} disabled={loading} />
          </Item>
        </div>
      </div>

      {/* Why, do you ask?

      Since we're releasing the new Admin even without the new Menu implementation,
      I think it's best to reduce the "area of impact" where users can set something
      but can't see the impact of it.
      */}
      {false && (
        <Divider>
          <Message id="tenant.product.assemblyOptions" />
        </Divider>
      )}

      {false && (
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
                          rules={[
                            ...rules.assemblyName,
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const allItems: Assembly[] = getFieldValue(
                                  'assemblyOptions'
                                )

                                const allNames = allItems
                                  .map(({ name }) => name)
                                  .filter(Boolean)

                                const ocurrences = allNames.reduce(
                                  (acc: number, current: string) =>
                                    acc + (current === value ? 1 : 0),
                                  0
                                )

                                if (ocurrences >= 2) {
                                  return Promise.reject(
                                    intl.formatMessage({
                                      id: 'tenant.productform.itemSameName',
                                    })
                                  )
                                }

                                return Promise.resolve()
                              },
                            }),
                          ]}
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
                          label={<Message id="tenant.product.price" />}
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
                          label={<Message id="tenant.product.type" />}
                          rules={rules.required}
                        >
                          <Select
                            size="large"
                            placeholder={
                              <Message id="tenant.product.placeholderType" />
                            }
                          >
                            {assemblyOptionsTypes?.map(({ name, value }) => (
                              <Option value={value} key={value}>
                                {name}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                      </div>
                    </div>
                    <div className="flex justify-around flex-auto w-100 w-auto-l">
                      <Item
                        label={<Message id="tenant.product.min" />}
                        name={[field.name, 'min']}
                        fieldKey={[field.fieldKey, 'min']}
                        rules={[...rules.assemblyMin]}
                      >
                        <NumberInput disabled={loading} />
                      </Item>
                      <Item
                        label={<Message id="tenant.product.max" />}
                        name={[field.name, 'max']}
                        fieldKey={[field.fieldKey, 'max']}
                        rules={[
                          ...rules.assemblyMax,
                          ({ getFieldValue }) => ({
                            validator: (_, value) => {
                              const otherMin = getFieldValue([
                                'assemblyOptions',
                                field.name,
                                'min',
                              ])

                              if (
                                typeof otherMin === 'number' &&
                                otherMin > value
                              ) {
                                return Promise.reject(
                                  intl.formatMessage({
                                    id: 'tenant.productform.lessThenMin',
                                  })
                                )
                              }

                              return Promise.resolve()
                            },
                          }),
                        ]}
                      >
                        <NumberInput disabled={loading} />
                      </Item>
                    </div>
                    <Divider orientation="left">
                      <Message id="tenant.product.options" />
                    </Divider>
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
                                        fieldKey={[
                                          optionField.fieldKey,
                                          'name',
                                        ]}
                                        rules={[
                                          ...rules.required,
                                          ({ getFieldValue }) => ({
                                            validator(_, value) {
                                              const allItems: AssemblyOption[] = getFieldValue(
                                                [
                                                  'assemblyOptions',
                                                  field.name,
                                                  'options',
                                                ]
                                              )

                                              const allNames = allItems
                                                .map(({ name }) => name)
                                                .filter(Boolean)

                                              const ocurrences = allNames.reduce(
                                                (
                                                  acc: number,
                                                  current: string
                                                ) =>
                                                  acc +
                                                  (current === value ? 1 : 0),
                                                0
                                              )

                                              if (ocurrences >= 2) {
                                                return Promise.reject(
                                                  intl.formatMessage({
                                                    id:
                                                      'tenant.productform.optionSameName',
                                                  })
                                                )
                                              }

                                              return Promise.resolve()
                                            },
                                          }),
                                        ]}
                                        label={
                                          <Message id="tenant.product.optionName" />
                                        }
                                      >
                                        <TextInput
                                          placeholder={intl.formatMessage({
                                            id:
                                              'tenant.product.placeholderOption',
                                          })}
                                        />
                                      </Form.Item>
                                    </div>
                                    <div className="w-20">
                                      <Form.Item
                                        {...optionField}
                                        name={[optionField.name, 'live']}
                                        fieldKey={[
                                          optionField.fieldKey,
                                          'live',
                                        ]}
                                        valuePropName="checked"
                                        rules={rules.required}
                                        label={<Message id="tenant.live" />}
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
                                      label={
                                        <Message id="tenant.product.description" />
                                      }
                                    >
                                      <TextInput
                                        placeholder={intl.formatMessage({
                                          id:
                                            'tenant.product.placeholderDescription',
                                        })}
                                      />
                                    </Form.Item>
                                  </div>
                                  <div className="flex justify-around">
                                    <div className="w-40 pr3">
                                      <Form.Item
                                        {...optionField}
                                        name={[optionField.name, 'price']}
                                        fieldKey={[
                                          optionField.fieldKey,
                                          'price',
                                        ]}
                                        label={
                                          <Message id="tenant.product.price" />
                                        }
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
                                        label={
                                          <Message id="tenant.product.initialQuantity" />
                                        }
                                      >
                                        <NumberInput />
                                      </Form.Item>
                                    </div>
                                  </div>

                                  <div className="flex justify-center">
                                    <Tooltip
                                      title={intl.formatMessage({
                                        id: 'tenant.product.removeOption',
                                      })}
                                    >
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
                                    <PlusOutlined />{' '}
                                    <Message id="tenant.product.addOption" />
                                  </Button>
                                </Form.Item>
                              </div>
                              <div className="flex justify-center">
                                <Tooltip
                                  title={intl.formatMessage({
                                    id: 'tenant.product.removeItem',
                                  })}
                                >
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
                      <PlusOutlined /> <Message id="tenant.product.addField" />
                    </Button>
                  </Form.Item>
                </div>
              </div>
            )
          }}
        </Form.List>
      )}

      <div className="flex justify-between">
        <Button
          loading={loading}
          size="large"
          type="primary"
          block
          htmlType="submit"
        >
          {intl.formatMessage({ id: editMode ? 'save' : 'tenant.product.add' })}
        </Button>
      </div>
    </Form>
  )
}

export default ProductForm
