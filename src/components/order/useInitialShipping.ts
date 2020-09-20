import { useEffect } from 'react'

import { Order, TenantConfig } from '../../typings'
import { Dispatch } from '../../contexts/order/OrderContext'

export const useInitialShipping = (
  tenant: TenantConfig,
  order: Order,
  dispatch: Dispatch
) =>
  useEffect(() => {
    if (!order || order?.shipping || !tenant) {
      return
    }

    if (!tenant?.migrated) {
      dispatch({
        type: 'SET_PARTIAL_ORDER',
        args: {
          shipping: {
            type: 'TAKEAWAY',
            price: tenant?.deliveryFee,
          },
        },
      })
    } else {
      const { shippingStrategies } = tenant

      const onlyHasDelivery =
        shippingStrategies?.deliveryFixed?.active &&
        !shippingStrategies?.takeaway?.active

      const onlyHasTakeAway =
        shippingStrategies?.takeaway?.active &&
        !shippingStrategies?.deliveryFixed?.active

      if (onlyHasDelivery || onlyHasTakeAway) {
        dispatch({
          type: 'SET_PARTIAL_ORDER',
          args: {
            shipping: {
              type: onlyHasDelivery ? 'DELIVERY' : 'TAKEAWAY',
              price: tenant?.shippingStrategies?.deliveryFixed?.price ?? 0,
            },
          },
        })
      }
    }
  }, [tenant, order, dispatch])
