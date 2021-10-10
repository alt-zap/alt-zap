import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button, Card, Popconfirm } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import { Order } from '../../../typings'
import { useAltIntl } from '../../../intlConfig'
import { updateOrder } from '../../../contexts/orders/OrdersContext'
import { useTenantConfig } from '../../../contexts/TenantContext'

interface Props {
  order: Order
}

const OrderSummary: FC<Props> = ({ order }) => {
  const intl = useAltIntl()
  const [loading, setLoading] = useState(false)
  const { tenantId } = useTenantConfig()

  const updateOrderState = useCallback(
    (state: Order['state']) => {
      setLoading(true)
      updateOrder({
        tenantId,
        orderData: { ...order, state },
      }).finally(() => {
        setLoading(false)
      })
    },
    [tenantId, order]
  )

  const onConfirm = useCallback(() => {
    updateOrderState('CONFIRMED')
  }, [updateOrderState])

  const onCancel = useCallback(() => {
    updateOrderState('DENIED')
  }, [updateOrderState])

  const cardBackgroundColor = useMemo(() => {
    switch (order.state) {
      case 'CREATED':
        return '#fff7ec'

      case 'DENIED':
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
              onConfirm={onCancel}
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
              onConfirm={onConfirm}
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
