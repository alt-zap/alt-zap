import { Button, Card } from 'antd'
import React, { FC } from 'react'

import { useOrdersState } from '../../../contexts/orders/OrdersContext'

export const OrdersList: FC = () => {
  const { orders } = useOrdersState()

  return (
    <div className="flex">
      {orders?.map((order) => (
        <Card
          key={order.id}
          hoverable
          extra={
            <Button size="small" type="link">
              Confirmar
            </Button>
          }
          title={
            <>
              <b>{order.customer?.name}</b>
              <span> - Mesa 2</span>
            </>
          }
          style={{ width: '100%' }}
        >
          {`${order.items.length} itens`}
        </Card>
      ))}
    </div>
  )
}

OrdersList.displayName = 'OrdersList'
