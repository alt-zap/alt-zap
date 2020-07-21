/* eslint-disable no-console */
import React, { FC } from 'react'
import { Button, Form, Switch, Select, Divider } from 'antd'
import { Rule } from 'antd/lib/form'
import InputMask from 'react-input-mask'

import TextInput from '../../common/TextInput'
import TextareaInput from '../../common/TextareaInput'
import { useTenantConfig } from '../../../contexts/TenantContext'

const { Item } = Form
const { Option } = Select

const labelFor = (label: string) => <span className="f4 fw1">{label}</span>

type ProductData = Pick<Product, 'id' | 'name' | 'live'>

type Props = {
  initialData?: Partial<ProductData>
  onValidSubmit?: (data: ProductData) => void
  loading?: boolean
  editMode?: boolean
}

const rules: Record<string, Rule[]> = {
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
}

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
    <Form
      form={form}
      layout="vertical"
      onFinish={(store) => onValidSubmit?.(store as ProductData)}
      initialValues={initialData}
    >
      <Item label={labelFor('Nome')} name="name" rules={rules.name}>
        <TextInput disabled={loading} />
      </Item>
      <Item name="select" label={labelFor('Categoria')} rules={rules.category}>
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

      <Divider>Preço e Disponibilidade</Divider>

      <div className="flex">
        <div className="w-50 pr3">
          <Item label={labelFor('Preço Base')} name="price" rules={rules.name}>
            <InputMask mask="">
              <TextInput placeholder="ex: (83) 99934-2545" addonBefore="R$" />
            </InputMask>
          </Item>
        </div>
        <div className="w-50">
          <Form.Item
            label={labelFor('Disponível')}
            name="live"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>
      </div>
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
  )
}

export default ProductForm
