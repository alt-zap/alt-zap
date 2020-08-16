import {
  Product,
  Category,
  TenantContextState,
  Action,
  TenantConfig,
  ShippingStrategies,
} from '../typings'

type Actions =
  | Action<'ADD_CATEGORY', { args: Category }>
  | Action<'EDIT_CATEGORY', { args: { categoryData: Category; index: number } }>
  | Action<'CATEGORY_START_LOADING'>
  | Action<'CATEGORY_STOP_LOADING'>
  | Action<'START_LOADING'>
  | Action<'STOP_LOADING'>
  | Action<'SET_TENANT', { args: TenantConfig }>
  | Action<'PRODUCT_START_LOADING'>
  | Action<'PRODUCT_STOP_LOADING'>
  | Action<'ADD_PRODUCT', { args: Product }>
  | Action<'EDIT_PRODUCT', { args: Product }>
  | Action<'SET_PRODUCTS', { args: Product[] }>
  | Action<'SET_ADDRESS', { args: Address }>
  | Action<'SET_SHIPPING', { args: ShippingStrategies }>
  | Action<'SET_TENANT_FIELD', { args: Partial<TenantConfig> }>
  | Action<'SET_TENANT_ID', { args: string }>

export type TenantContextActions = Actions

export const tenantStateReducer = (
  state: TenantContextState,
  action: Actions
): TenantContextState => {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      const category = action.args || {}

      const current = state.tenant?.categories

      return {
        ...state,
        tenant: {
          ...(state.tenant as TenantConfig),
          categories: current ? [...current, category] : [category],
        },
      }
    }

    case 'EDIT_CATEGORY': {
      const { categoryData, index } = action.args || {}

      const newCategories = [...(state.tenant?.categories as Category[])]

      newCategories[index] = categoryData

      return {
        ...state,
        tenant: {
          ...(state.tenant as TenantConfig),
          categories: newCategories,
        },
      }
    }

    case 'ADD_PRODUCT': {
      const product = action.args || {}

      const current = state.products

      return {
        ...state,
        products: current ? [...current, product] : [product],
      }
    }

    case 'EDIT_PRODUCT': {
      const product = action.args || {}

      const index = state.products?.findIndex(
        ({ id }) => id === product.id
      ) as number

      const newProducts = [...(state.products as Product[])]

      newProducts[index] = product

      return {
        ...state,
        products: newProducts,
      }
    }

    case 'SET_PRODUCTS': {
      const products = action.args || {}

      return {
        ...state,
        products,
      }
    }

    case 'PRODUCT_START_LOADING': {
      return {
        ...state,
        productsLoading: true,
      }
    }

    case 'PRODUCT_STOP_LOADING': {
      return {
        ...state,
        productsLoading: false,
      }
    }

    case 'CATEGORY_START_LOADING': {
      return {
        ...state,
        categoryLoading: true,
      }
    }

    case 'CATEGORY_STOP_LOADING': {
      return {
        ...state,
        categoryLoading: false,
      }
    }

    case 'START_LOADING': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'STOP_LOADING': {
      return {
        ...state,
        loading: false,
      }
    }

    case 'SET_TENANT': {
      const tenant = action.args || {}

      return {
        ...state,
        tenant,
      }
    }

    case 'SET_ADDRESS': {
      const address = action.args

      return {
        ...state,
        tenant: {
          ...(state.tenant as TenantConfig),
          address,
        },
      }
    }

    case 'SET_SHIPPING': {
      const shippingStrategies = action.args

      return {
        ...state,
        tenant: {
          ...(state.tenant as TenantConfig),
          shippingStrategies,
        },
      }
    }

    case 'SET_TENANT_FIELD': {
      const update = action.args

      return {
        ...state,
        tenant: {
          ...(state.tenant as TenantConfig),
          ...update,
        },
      }
    }

    case 'SET_TENANT_ID': {
      const tenantId = action.args

      return {
        ...state,
        tenantId,
      }
    }

    default: {
      return state
    }
  }
}
