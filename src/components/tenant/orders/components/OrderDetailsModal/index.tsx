import React, { FC } from 'react'
import { Button, Modal } from 'antd'
import { Order } from '@src/typings'

import { OrderAction } from '../OrderActions'

interface Props {
  order: Order
  onAction(action: OrderAction): void
}

const OrderDetailsModal: FC<Props> = ({ order }) => {
  return (
    <Modal
      visible
      title="Pedido nº 0001"
      footer={[
        <Button key="back" onClick={() => {}}>
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={() => {}}>
          Submit
        </Button>,
        <Button
          key="link"
          href="https://google.com"
          type="primary"
          onClick={() => {}}
        >
          Search on Google
        </Button>,
      ]}
    >
      <div>Test</div>
    </Modal>
  )
}

export { OrderDetailsModal }
