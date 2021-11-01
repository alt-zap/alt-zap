import React, { FC } from 'react'
import { Button, Modal, Space, Typography } from 'antd'
import { Order } from '@src/typings'
import { useAltIntl } from '@src/intlConfig'

import { OrderAction } from '../OrderActions'
import { OrderTimeline } from '../OrderTimeline'

const { Text } = Typography

interface Props {
  order: Order
  onAction(action: OrderAction): void
}

const OrderDetailsModal: FC<Props> = ({ order }) => {
  const intl = useAltIntl()

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
      <div className="flex flex-column ">
        <Text className="mb3" strong>
          {intl.formatMessage({ id: 'order.statuses' })}
        </Text>
        <OrderTimeline order={order} />
      </div>
    </Modal>
  )
}

export { OrderDetailsModal }
