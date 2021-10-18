import React, { ComponentPropsWithoutRef, FC, useMemo } from 'react'
import { Typography } from 'antd'
import { useAltIntl } from '@src/intlConfig'
import moment from 'moment'
import { Order } from '@src/typings'
import Real from '@src/components/Real'

import { OrderTag } from './OrderTag'

const { Text } = Typography

interface Props {
  order: Order
  mode: 'full' | 'lean'
}

const OrderTitle: FC<Props> = ({ order, mode }) => {
  const intl = useAltIntl()

  const orderPrice = useMemo(() => order?.totalizers?.totalPrice, [order])

  const timeFormat = useMemo(() => (mode === 'full' ? 'LT' : 'lll'), [mode])
  const priceColor = useMemo<
    ComponentPropsWithoutRef<typeof Text>['type']
  >(() => {
    return order?.state === 'CANCELED' ? 'danger' : 'success'
  }, [order])

  return (
    <div className="flex justify-between" style={{ flex: 1 }}>
      <div>
        <OrderTag order={order} />
        <b>{order.customer?.name}</b>
        <span>{` - ${intl.formatMessage(
          { id: 'orders.table' },
          { table: `${order?.table}` }
        )}`}</span>
        <span className="light-silver f6 pl2">{` ${moment(
          order?.createdAt
        ).format(timeFormat)}`}</span>
      </div>
      {mode === 'lean' && (
        <div>
          <span className="f6 light-silver mr2">
            {intl.formatMessage(
              { id: 'order.nitems' },
              { n: order?.items?.length }
            )}
          </span>
          <span className="f5 b">
            {orderPrice && (
              <Text type={priceColor} delete={order?.state === 'CANCELED'}>
                <Real cents={orderPrice} />
              </Text>
            )}
          </span>
        </div>
      )}
    </div>
  )
}

export { OrderTitle }
