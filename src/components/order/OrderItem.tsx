/* eslint-disable no-console */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Input, Form } from 'antd'
import ReactMarkdown from 'react-markdown'
import { styled } from 'linaria/react'

import { OrderItem as IOrderItem, Product } from '../../typings'
import AssemblyRenderer from './AssemblyRenderer'
import { useAltIntl } from '../../intlConfig'
import OrderItemFooter from './OrderItemFooter'
import {
  calculateItemPrice,
  mapFormToAssembly,
} from '../../functions/orderItem'
import { ProductDescription } from './ProductDescription'

const { TextArea } = Input
const { Item } = Form

type Props = {
  product: Product
  onAddItem: (item: IOrderItem) => void
  loading?: boolean
}

type FormInput = {
  info?: string
  assembly?: Record<string, Record<string, string>>
  quantity: string
}

const OrderItem: FC<Props> = ({ product, onAddItem, loading }) => {
  const { name, description, imgSrc } = product
  const [partialItem, setPartialItem] = useState<IOrderItem>()
  const intl = useAltIntl()
  const [form] = Form.useForm()

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

    const initialItem: Omit<IOrderItem, 'itemPrice'> = {
      product,
      // Inconsistency with the Form.Item's initial value
      quantity: 1,
      info: '',
      selectedItems: mapFormToAssembly(data.assembly ?? {}),
    }

    const itemPrice = calculateItemPrice(initialItem)

    setPartialItem(
      Object.assign(initialItem, { itemPrice } as Pick<IOrderItem, 'itemPrice'>)
    )
    mounted.current = true
  }, [form, product])

  // Calculates the "partial" item reactively
  // Not the best idea, but it's what we have
  const onFormChange = useCallback(
    (_, data) => {
      const formData = data as FormInput
      const numberQt = parseInt(data.quantity, 10)

      const itemInput: Omit<IOrderItem, 'itemPrice'> = {
        product,
        quantity: numberQt,
        info: formData.info,
        selectedItems: mapFormToAssembly(formData.assembly ?? {}),
      }

      const itemPrice = calculateItemPrice(itemInput)

      setPartialItem(
        Object.assign(itemInput, { itemPrice } as Pick<IOrderItem, 'itemPrice'>)
      )
    },
    [setPartialItem, product]
  )

  const onSubmit = useCallback(() => {
    partialItem && onAddItem(partialItem)
  }, [onAddItem, partialItem])

  return (
    <Wrapper>
      {!!imgSrc && (
        <img src={imgSrc} alt={name} title={name} className="shadow-1 w-100" />
      )}
      <span className="f3 tc mt2 b">{name}</span>
      {!!description && (
        <div className="flex justify-center w-100">
          <ProductDescription>
            <ReactMarkdown className="tc pt2" source={description} />
          </ProductDescription>
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
        <OrderItemFooter
          totalPrice={partialItem?.itemPrice ?? 0}
          loading={loading ?? false}
        />
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default OrderItem
