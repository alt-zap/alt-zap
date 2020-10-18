/* eslint-disable no-console */
import React, { FC } from 'react'
import { Input, Form } from 'antd'
import ReactMarkdown from 'react-markdown'

import { Product } from '../../typings'
import AssemblyRenderer from './AssemblyRenderer'
import { useAltIntl } from '../../intlConfig'
import OrderItemFooter from './OrderItemFooter'

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
        <div className="flex justify-center w-100">
          <div
            className="w-90 b--solid b--light-gray pa2 mt2 br2"
            style={{ borderWidth: '1px' }}
          >
            <ReactMarkdown className="tc pt2" source={description} />
          </div>
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
        <div className="flex justify-center w-100">
          <div className="w-90">
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
          </div>
        </div>
        <OrderItemFooter quantity="1" />
      </Form>
    </div>
  )
}

export default OrderItem
