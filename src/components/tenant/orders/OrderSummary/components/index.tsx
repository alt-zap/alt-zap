import React, { FC, ReactNode, useMemo } from 'react'
import { Card } from 'antd'

import { Order } from '../../../../../typings'
import { OrderTag } from '../../components/OrderTag'
import { OrderActions } from '../../components/OrderActions'

interface Props {
  order: Order
  mode: 'lean' | 'full'
  onStateChange(state: Order['state']): void
  loading?: boolean
}

const OrderSummary: FC<Props> = ({ mode, order, onStateChange, loading }) => {
  const cardBackgroundColor = useMemo(() => {
    switch (order.state) {
      case 'CREATED':
        return '#fff7ec'

      default:
        return '#FFF'
    }
  }, [order])

  const title = useMemo<ReactNode>(() => {
    return (
      <>
        <OrderTag order={order} />
        <b>{order.customer?.name}</b>
        <span> - Mesa 2</span>
      </>
    )
  }, [order])

  return (
    <Card
      key={order.id}
      hoverable
      extra={
        mode === 'full' && (
          <OrderActions
            order={order}
            loading={loading}
            onStateChange={onStateChange}
          />
        )
      }
      title={mode === 'full' && title}
      style={{
        width: '100%',
        marginBottom: 10,
        padding: 0,
        backgroundColor: cardBackgroundColor,
      }}
      bodyStyle={{
        padding: 10,
      }}
    >
      {mode === 'full' ? (
        `${order.items.length} itens`
      ) : (
        <div className="flex">{title}</div>
      )}
    </Card>
  )
}

export { OrderSummary }
