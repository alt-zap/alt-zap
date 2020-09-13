import { Action, Order, OrderItem } from '../../typings'

type Actions =
  | Action<'ADD_ITEM', { args: OrderItem }>
  | Action<'UPSERT_ITEM', { args: OrderItem }>
  | Action<'SET_ORDER', { args: Order }>
  | Action<'SET_TOTAL_PRICE', { args: number }>

export type OrderContextActions = Actions

export type OrderContextState = {
  order: Order | null
}

export const orderStateReducer = (
  state: OrderContextState,
  action: Actions
): OrderContextState => {
  switch (action.type) {
    case 'SET_ORDER': {
      const order = action.args

      return {
        ...state,
        order,
      }
    }

    case 'ADD_ITEM': {
      const item = action.args || {}

      const currentItems = state?.order?.items

      return {
        ...state,
        order: {
          ...(state.order as Order),
          items: currentItems ? [...currentItems, item] : [item],
        },
      }
    }

    case 'UPSERT_ITEM': {
      const item = action.args || {}

      const currentItems = state?.order?.items ?? []

      const index = currentItems?.findIndex(
        ({ product: { name } }) => name === item.product.name
      ) as number

      const newItems = [...currentItems]

      if (index < 0) {
        newItems.push(item)
      } else {
        newItems[index] = item
      }

      return {
        ...state,
        order: {
          ...(state.order as Order),
          items: newItems,
        },
      }
    }

    case 'SET_TOTAL_PRICE': {
      const totalPrice = action.args

      const shippingPrice = state.order?.totalizers?.shippingPrice ?? 0

      return {
        ...state,
        order: {
          ...(state.order as Order),
          totalizers: {
            shippingPrice,
            totalPrice,
            finalPrice: totalPrice + shippingPrice,
          },
        },
      }
    }

    default: {
      return state
    }
  }
}
