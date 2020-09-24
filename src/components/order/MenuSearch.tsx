import React, { FC, useState } from 'react'
import { Form, Select, Input } from 'antd'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { useDebouncedCallback } from 'use-debounce'

import { Product } from '../../typings'

const { Option } = Select

export type Section = {
  name: string
  slug: string
  products: Product[]
}

type Props = {
  availableSections: Section[]
  activeSection: string
  onSection: (slug: string) => void
  setQuery: (data: string | null) => void
}
const MenuSearch: FC<Props> = ({
  availableSections,
  activeSection,
  setQuery,
  onSection,
}) => {
  const [loading, setLoading] = useState(false)

  const [debouncedOnChange] = useDebouncedCallback((value: string | null) => {
    setQuery(value)
    setLoading(false)
  }, 1000)

  return (
    <Form layout="vertical" className="w-100">
      <div
        className="flex justify-between br2 pt3 ph3 shadow-2 mb2"
        style={{ backgroundColor: '#f0f2f5' }}
      >
        <Form.Item
          label="Categoria"
          className="w-40 mr2"
          style={{ display: 'unset' }}
        >
          <Select
            getPopupContainer={(trigger) => trigger.parentElement}
            value={activeSection}
            size="large"
            onChange={onSection}
          >
            {availableSections.map(({ name, slug }, i) => (
              <Option key={i} value={slug}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Busca"
          name="searchTerm"
          className="w-60"
          style={{ display: 'unset' }}
        >
          <Input
            allowClear
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
