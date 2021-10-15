import React, { FC } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { useAltIntl } from '@src/intlConfig'
import { Order } from '@src/typings'
import { Button, Popconfirm } from 'antd'

interface Props {
  order: Order
  loading?: boolean
  onStateChange(state: Order['state']): void
}

const OrderActions: FC<Props> = ({ order, onStateChange, loading }) => {
  const intl = useAltIntl()

  return (
    <>
      {order.state !== 'CANCELED' && (
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
  )
}

export { OrderActions }
