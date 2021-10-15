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

  return (
    <Component
      mode={mode}
      loading={loading}
      onStateChange={onUpdateState}
      order={order}
    />
  )
}

export { OrderSummaryContainer }
