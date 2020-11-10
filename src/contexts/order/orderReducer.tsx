import { Action, Order, OrderItem, WorldAddress } from '../../typings'

type Actions =
  | Action<'ADD_ITEM', { args: OrderItem }>
  | Action<'UPSERT_ITEM', { args: OrderItem }>
  | Action<'SET_ORDER', { args: Order }>
  | Action<'SET_TOTAL_PRICE', { args: number }>
  | Action<'SET_SHIPPING_PRICE', { args: number }>
  | Action<'SET_PARTIAL_ORDER', { args: Partial<Order> }>
  | Action<'SET_CUSTOMER_ADDRESS', { args: WorldAddress }>

export type OrderContextActions = Actions

export type OrderContextState = {
  order: Order | null
}

export const orderStateReducer = (
  state: OrderContextState,
  action: Actions
): OrderContextState => {
  switch (action.type) {
    case 'SET_PARTIAL_ORDER': {
      const data = action.args

      return {
        ...state,
        order: {
          ...(state.order as Order),
          ...data,
        },
      }
    }

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
        ({ product: { id } }) => id === item.product.id
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
          items: newItems.filter(({ quantity }) => quantity > 0),
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

    case 'SET_SHIPPING_PRICE': {
      const shippingPrice = action.args

      const totalPrice = state.order?.totalizers?.totalPrice ?? 0

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

    case 'SET_CUSTOMER_ADDRESS': {
      const address = action.args

      return {
        ...state,
        order: {
          ...(state.order as Order),
          shipping: {
            ...state.order?.shipping,
            address,
          } as Order['shipping'],
        },
      }
    }

    default: {
      return state
    }
  }
}
