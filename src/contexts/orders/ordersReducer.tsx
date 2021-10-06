import { Action, Order } from '../../typings'

type Actions =
  | Action<'ADD_ORDER', { args: Order }>
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

      const orders = state.orders ? [...state.orders, newOrder] : [newOrder]

      return {
        ...state,
        orders,
      }
    }

    case 'ADD_ORDERS': {
      const newOrders = action.args
      const orders = state.orders
        ? [...state.orders, ...newOrders]
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
