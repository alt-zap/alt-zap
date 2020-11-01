/* eslint-disable no-console */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Input, Form } from 'antd'
import ReactMarkdown from 'react-markdown'

import { OrderItemInput, Product } from '../../typings'
import AssemblyRenderer from './AssemblyRenderer'
import { useAltIntl } from '../../intlConfig'
import OrderItemFooter from './OrderItemFooter'
import { useItemPrice } from '../../hooks/useItemPrice'
import { mapFormToAssembly } from '../../functions/orderItem'

const { TextArea } = Input
const { Item } = Form

type Props = {
  product: Product
  onAddItem: (item: OrderItemInput) => void
  loading?: boolean
}

type FormInput = {
  info?: string
  assembly?: Record<string, Record<string, string>>
  quantity: string
}

const OrderItem: FC<Props> = ({ product, onAddItem, loading }) => {
  const { name, description, imgSrc } = product
  const [partialItem, setPartialItem] = useState<OrderItemInput>()
  const intl = useAltIntl()
  const [form] = Form.useForm()
  const itemPrice = useItemPrice(partialItem)

  const mounted = useRef<boolean>()

  // This, supposedly, only runs when the form is mounted.
  // What is exactly what we need to compute the inital OrderItemInput
  // But, seguro morreu de velho, so we're using a Ref to enforce that.
  // (We need this to not have two functions to compute the initial Item)
  useEffect(() => {
    if (mounted.current) {
      return
    }

    const data = form.getFieldsValue() as FormInput

    const initialItem = {
      product,
      // Inconsistency with the Form.Item's initial value
      quantity: 1,
      info: '',
      selectedItems: mapFormToAssembly(data.assembly ?? {}),
    }

    setPartialItem(initialItem)
    mounted.current = true
  }, [form, product])

  // Calculates the "partial" item reactively
  // Not the best idea, but it's what we have
  const onFormChange = useCallback(
    (_, data) => {
      // Mind initial quantity
      const formData = data as FormInput
      const numberQt = parseInt(data.quantity, 10)

      console.log({ formData })

      setPartialItem({
        product,
        quantity: numberQt,
        info: formData.info,
        selectedItems: mapFormToAssembly(formData.assembly ?? {}),
      })
    },
    [setPartialItem, product]
  )

  const onSubmit = useCallback(() => {
    partialItem && onAddItem(partialItem)
  }, [onAddItem, partialItem])

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
        onValuesChange={onFormChange}
        onFinish={onSubmit}
      >
        {!!product.assemblyOptions && (
          <AssemblyRenderer assemblyOptions={product.assemblyOptions} />
        )}
        <div className="flex justify-center w-100">
          <div className="w-90">
            <Item
              label={intl.formatMessage({ id: 'order.field.description' })}
              name="info"
            >
              <TextArea
                placeholder={intl.formatMessage({
                  id: 'order.field.descriptionPlaceholder',
                })}
              />
            </Item>
          </div>
        </div>
        <OrderItemFooter totalPrice={itemPrice} loading={loading ?? false} />
      </Form>
    </div>
  )
}

export default OrderItem
