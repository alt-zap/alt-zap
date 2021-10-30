import React, { FC, useMemo } from 'react'
import { Card } from 'antd'
import { useAltIntl } from '@src/intlConfig'
import { Order } from '@src/typings'

import { OrderAction, OrderActions } from '../components/OrderActions'
import { OrderTitle } from '../components/OrderTitle'
import { OrderItemDetails } from '../components/OrderItemDetails'

interface Props {
  order: Order
  mode: 'lean' | 'full'
  onAction(action: OrderAction): void
  loading?: boolean
}

const OrderSummary: FC<Props> = ({ mode, order, onAction, loading }) => {
  const intl = useAltIntl()
  const cardBackgroundColor = useMemo(() => {
    switch (order.state) {
      case 'CREATED':
        return '#fff7ec'

      default:
        return '#FFF'
    }
  }, [order])

  return (
    <Card
      key={order.id}
      hoverable
      extra={
        mode === 'full' && (
          <OrderActions order={order} loading={loading} onAction={onAction} />
        )
      }
      title={mode === 'full' && <OrderTitle mode={mode} order={order} />}
      style={{
        width: '100%',
        marginBottom: 10,
        padding: 0,
        backgroundColor: cardBackgroundColor,
      }}
      bodyStyle={{
        padding: mode === 'full' ? 0 : 10,
      }}
      headStyle={{
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {mode === 'full' ? (
        <OrderItemDetails order={order} />
      ) : (
        <div className="flex">
          <OrderTitle mode={mode} order={order} />
        </div>
      )}
    </Card>
  )
}

export { OrderSummary }
