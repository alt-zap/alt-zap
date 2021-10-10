import { Action, Order } from '../../typings'

type Actions =
  | Action<'ADD_ORDER', { args: Order }>
  | Action<'UPDATE_ORDER', { args: Order }>
  | Action<'ADD_ORDERS', { args: Order[] }>
  | Action<'RESET_ORDERS'>

export type OrdersContextActions = Actions

export type OrdersContextState = {
  orders?: Order[]
}

export const ordersStateReducer = (
  state: OrdersContextState,
  action: Actions
): OrdersContextState => {
  switch (action.type) {
    case 'ADD_ORDER': {
      const newOrder = action.args

      const orders =
        state.orders && !state.orders?.find(({ id }) => id === newOrder.id)
          ? [newOrder, ...state.orders]
          : [newOrder]

      return {
        ...state,
        orders,
      }
    }

    case 'UPDATE_ORDER': {
      const order = action.args

      const orderIndex = state.orders?.findIndex(({ id }) => id === order.id)

      if (
        typeof orderIndex === 'undefined' ||
        orderIndex < 0 ||
        !state.orders
      ) {
        throw new Error('Order not yet added to local cache!')
      }

      const orders = [
        ...state.orders.slice(0, orderIndex),
        order,
        ...state.orders.slice(orderIndex + 1),
      ]

      return {
        ...state,
        orders,
      }
    }

    case 'ADD_ORDERS': {
      const newOrders = action.args
      const orders = state.orders
        ? [...newOrders, ...state.orders]
        : [...newOrders]

      return {
        ...state,
        orders,
      }
    }

    case 'RESET_ORDERS': {
      return {
        ...state,
        orders: [],
      }
    }

    default: {
      return state
    }
  }
}
