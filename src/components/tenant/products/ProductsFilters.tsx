import React, { FC } from 'react'
import { Form, Select, Input } from 'antd'

import { Category } from '../../../typings'

const { Option } = Select
const { Item } = Form

type Props = {
  categories: Category[]
  onChangeFilters: (a: Record<string, string>) => void
}

const ProductsFilter: FC<Props> = ({ onChangeFilters, categories }) => {
  return (
    <Form
      initialValues={{
        category: '',
      }}
      className=""
      layout="vertical"
      onFieldsChange={(_, fields) => {
        const newFilters = fields.reduce(
          (acc, cur) => ({
            ...acc,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [(cur as any).name[0]]: cur.value,
          }),
          {}
        )

        onChangeFilters(newFilters)
      }}
    >
      <div
        className="flex items-center pa3 mb2 br1"
        style={{ border: '1px solid #d9d9d9' }}
      >
        <div className="w-60 pr3">
          <Item name="name" label="Filtar por Nome">
            <Input size="large" placeholder="ex: Burguer" />
          </Item>
        </div>

        <Item name="category" label="ou por Categoria" className="w-60">
          <Select size="large" placeholder="Selecione a categoria">
            <Option value="" key="todas">
              Todas
            </Option>
            {categories?.map(({ name }, index) => (
              <Option value={index} key={index}>
                {name}
              </Option>
            ))}
          </Select>
        </Item>
      </div>
    </Form>
  )
}

export default ProductsFilter
