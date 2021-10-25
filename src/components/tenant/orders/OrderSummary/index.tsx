import React, {
  FC,
  useCallback,
  useState,
  ComponentPropsWithoutRef,
} from 'react'

import { useTenantConfig } from '../../../../contexts/TenantContext'
import { updateOrder } from '../../../../contexts/orders/OrdersContext'
import { Order } from '../../../../typings'
import { OrderSummary as Component } from './components'
import { OrderAction } from '../components/OrderActions'

type Props = Pick<ComponentPropsWithoutRef<typeof Component>, 'mode' | 'order'>

const OrderSummaryContainer: FC<Props> = ({ order, mode }) => {
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

  const onUpdateState = useCallback(
    (state: Order['state']) => {
      updateOrderState(state)
    },
    [updateOrderState]
  )

  const onAction = useCallback(
    (action: OrderAction) => {
      switch (action.type) {
        case 'set_state':
          onUpdateState(action.state)
          break

        case 'set_last':
          break

        default:
          break
      }
    },
    [onUpdateState]
  )

  return (
    <Component
      mode={mode}
      loading={loading}
      onAction={onAction}
      order={order}
    />
  )
}

export { OrderSummaryContainer }
