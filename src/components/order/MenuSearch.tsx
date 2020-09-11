import React, { FC, useState } from 'react'
import { Form, Select, Input } from 'antd'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { useDebouncedCallback } from 'use-debounce'

import { Category } from '../../typings'

const { Option } = Select

type Props = {
  availableSections: Category[]
  setQuery: (data: string | null) => void
}
const MenuSearch: FC<Props> = ({ availableSections, setQuery }) => {
  const [loading, setLoading] = useState(false)

  const [debouncedOnChange] = useDebouncedCallback((value: string | null) => {
    setQuery(value)
    setLoading(false)
  }, 1000)

  return (
    <Form layout="vertical">
      <div className="flex justify-between bg-white pt3 ph3 br2">
        <Form.Item label="Categoria" className="w-40 mr2">
          <Select size="large">
            {availableSections.map(({ name }, i) => (
              <Option key={i} value={i}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Busca" name="searchTerm" className="w-60">
          <Input
            suffix={loading && <LoadingOutlined />}
            onChange={(e) => {
              setLoading(true)
              debouncedOnChange(e.target.value || null)
            }}
            prefix={<SearchOutlined className="pr1" />}
            size="large"
            name="a"
          />
        </Form.Item>
      </div>
    </Form>
  )
}

export default MenuSearch
