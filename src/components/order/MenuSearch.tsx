import React, { FC } from 'react'
import { Form, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { Category } from '../../typings'

const { Option } = Select

type Props = { availableCatogories: Category[] }
const MenuSearch: FC<Props> = ({ availableCatogories }) => {
  return (
    <Form layout="vertical">
      <div className="flex justify-between bg-white pt3 ph3 br2">
        <Form.Item label="Categoria" className="w-40 mr2">
          <Select size="large">
            {availableCatogories.map(({ name }, i) => (
              <Option key={i} value={i}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Busca" name="searchTerm" className="w-60">
          <Input
            prefix={<SearchOutlined className="pr2" />}
            size="large"
            name="a"
          />
        </Form.Item>
      </div>
    </Form>
  )
}

export default MenuSearch
