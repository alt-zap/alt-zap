import React, { FC, useMemo } from 'react'
import { Button, Card, Popconfirm } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import { Order } from '../../../../typings'
import { useAltIntl } from '../../../../intlConfig'

interface Props {
  order: Order
  mode: 'lean' | 'full'
  onStateChange(state: Order['state']): void
  loading: boolean
}

const OrderSummary: FC<Props> = ({ order, onStateChange, loading }) => {
  const intl = useAltIntl()
  const cardBackgroundColor = useMemo(() => {
    switch (order.state) {
      case 'CREATED':
        return '#fff7ec'

      case 'CANCELED':
        return '#ffecec'

      default:
        return '#FFF'
    }
  }, [order])

  return (
    <Card
      key={order.id}
      hoverable
      extra={
        <>
          {order.state !== 'DENIED' && (
            <Popconfirm
              title={intl.formatMessage({ id: 'orders.cancelPrompt' })}
              onConfirm={() => onStateChange('CANCELED')}
              okText={intl.formatMessage({ id: 'common.yes' })}
              cancelText={intl.formatMessage({ id: 'common.no' })}
            >
              <Button
                loading={loading}
                danger
                size="small"
                type="dashed"
                className="mr2"
              >
                {intl.formatMessage({ id: 'orders.cancel' })}
              </Button>
            </Popconfirm>
          )}
          {order.state === 'CREATED' && (
            <Popconfirm
              title={intl.formatMessage({ id: 'orders.confirmPrompt' })}
              onConfirm={() => onStateChange('CONFIRMED')}
              okText={intl.formatMessage({ id: 'common.yes' })}
              cancelText={intl.formatMessage({ id: 'common.no' })}
            >
              <Button
                loading={loading}
                size="small"
                type="primary"
                icon={<CheckOutlined />}
              >
                {intl.formatMessage({ id: 'orders.confirm' })}
              </Button>
            </Popconfirm>
          )}
        </>
      }
      title={
        <>
          <b>{order.customer?.name}</b>
          <span> - Mesa 2</span>
        </>
      }
      style={{
        width: '100%',
        marginBottom: 10,
        backgroundColor: cardBackgroundColor,
      }}
    >
      {`${order.items.length} itens`}
    </Card>
  )
}

export { OrderSummary }
