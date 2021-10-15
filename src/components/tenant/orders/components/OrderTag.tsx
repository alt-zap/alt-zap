import React, { ComponentPropsWithoutRef, FC, ReactNode, useMemo } from 'react'
import { Tag } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import { useAltIntl } from '@src/intlConfig'
import { Order } from '@src/typings'

interface Props {
  order: Order
}
export const OrderTag: FC<Props> = ({ order }) => {
  const intl = useAltIntl()

  const tagProps = useMemo<
    Pick<ComponentPropsWithoutRef<typeof Tag>, 'color' | 'children'>
  >(() => {
    switch (order.state) {
      case 'CONFIRMED':
        return {
          color: 'success',
          children: intl.formatMessage({ id: 'orders.state.confirmed' }),
        }

      case 'CANCELED':
        return {
          color: 'error',
          children: intl.formatMessage({ id: 'orders.state.canceled' }),
        }

      case 'CREATED':
        return {
          color: 'warning',
          children: intl.formatMessage({ id: 'orders.state.created' }),
        }

      case 'FULFILLED':
        return {
          color: 'processing',
          children: intl.formatMessage({ id: 'orders.state.fulfilled' }),
        }

      default:
        throw new Error('state not recognized')
    }
  }, [order, intl])

  const tagIcon = useMemo<ReactNode>(() => {
    if (order.last) {
      return <MinusCircleOutlined />
    }

    return null
  }, [order])

  return <Tag {...tagProps} icon={tagIcon} />
}
