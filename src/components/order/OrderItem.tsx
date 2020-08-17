/* eslint-disable no-console */
import React, { FC } from 'react'
import { Input, Form } from 'antd'
import ReactMarkdown from 'react-markdown'

import { Product } from '../../typings'
import AssemblyRenderer from './AssemblyRenderer'
import { useAltIntl } from '../../intlConfig'

const { TextArea } = Input
const { Item } = Form

type Props = { product: Product }

const OrderItem: FC<Props> = ({ product }) => {
  const { name, description, imgSrc } = product

  const intl = useAltIntl()
  const [form] = Form.useForm()

  return (
    <div className="flex flex-column items-center pt4">
      <img src={imgSrc} alt={name} title={name} className="br2 shadow-1" />
      <span className="f3 tc mt2 b">{name}</span>
      {!!description && (
        <div
          className="b--solid b--light-gray pa2 mt2 br2"
          style={{ borderWidth: '1px' }}
        >
          <ReactMarkdown className="tc pt2" source={description} />
        </div>
      )}
      <Form
        className="w-100"
        form={form}
        layout="vertical"
        onValuesChange={(_, a) => console.log(a)}
      >
        {!!product.assemblyOptions && (
          <AssemblyRenderer assemblyOptions={product.assemblyOptions} />
        )}
        <Item
          label={intl.formatMessage({ id: 'order.field.description' })}
          name="descriptions"
        >
          <TextArea
            placeholder={intl.formatMessage({
              id: 'order.field.descriptionPlaceholder',
            })}
          />
        </Item>
      </Form>
    </div>
  )
}

export default OrderItem
