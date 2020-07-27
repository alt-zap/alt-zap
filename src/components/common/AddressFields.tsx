import React, { FC, Fragment } from 'react'
import { Form, Select, Input } from 'antd'
import { Rule } from 'antd/lib/form'

import { estados } from '../../constants'

const { Item } = Form
const { Option } = Select

type Props = {
  rules: Record<string, Rule[]>
}

const AddressFields: FC<Props> = ({ rules }) => {
  return (
    <Fragment>
      <div className="flex w-100 justify-center">
        <div className="w-80 mr2">
          <Item name="logradouro" rules={rules.logradouro} label="Logradouro">
            <Input size="large" placeholder="ex: Rua Margarida Maria Alves" />
          </Item>
        </div>
        <div className="w-20">
          <Item label="Número" name="numero" rules={rules.numero}>
            <Input size="large" />
          </Item>
        </div>
      </div>
      <div className="flex w-100 justify-center">
        <div className="w-50 mr2">
          <Item label="Complemento" name="complemento">
            <Input size="large" placeholder="ex: Apto 205" />
          </Item>
        </div>
        <div className="w-50">
          <Item label="Bairro" name="bairro" rules={rules.bairro}>
            <Input size="large" />
          </Item>
        </div>
      </div>
      <div className="flex w-100 justify-center">
        <div className="w-60 mr2">
          <Item name="cidade" label="Cidade" rules={rules.cidade}>
            <Input size="large" />
          </Item>
        </div>
        <div className="w-40">
          <Item name="estado" label="Estado" rules={rules.estado}>
            <Select size="large">
              {estados.map(({ uf, value }) => (
                <Option key={uf} value={uf}>
                  {value}
                </Option>
              ))}
            </Select>
          </Item>
        </div>
      </div>
    </Fragment>
  )
}

export default AddressFields
