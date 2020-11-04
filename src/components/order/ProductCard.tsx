import React, { FC, Fragment, useCallback, useState } from 'react'
import { message, Modal } from 'antd'

import { OrderItem as IOrderItem, Product } from '../../typings'
import OrderItem from './OrderItem'
import '../../css/global.css'
import ProductSummary from '../common/ProductSummary'
import { useOrderDispatch } from '../../contexts/order/OrderContext'

type Props = {
  product: Product
}

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })

const ProductCard: FC<Props> = ({ product: { name }, product }) => {
  const [orderItemModal, setOrderItemModal] = useState(false)
  const [setSimulatedLoading, setLoading] = useState(false)
  const dispatch = useOrderDispatch()

  const onAddItem = useCallback(
    (item: IOrderItem) => {
      setLoading(true)

      dispatch({ type: 'ADD_ITEM', args: item })
      wait(500).then(() => {
        setLoading(false)
        setOrderItemModal(false)

        message.success('Item adicionado com sucesso')
      })
    },
    [setLoading, setOrderItemModal, dispatch]
  )

  return (
    <Fragment>
      <ProductSummary
        product={product}
        onClick={() => setOrderItemModal(true)}
      />
      <Modal
        className="customModal"
        title={name}
        footer={null}
        onCancel={() => setOrderItemModal(false)}
        visible={orderItemModal}
        destroyOnClose
      >
        <OrderItem
          product={product}
          onAddItem={onAddItem}
          loading={setSimulatedLoading}
        />
      </Modal>
    </Fragment>
  )
}

export default ProductCard
