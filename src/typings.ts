import { Element } from './utils'

export interface TenantConfig {
  name: string
  slug: string
  userId: string
  whatsapp: string
  instagram?: string
  logoSrc?: string
  color?: string
  live: boolean
  deliveryFee: number
  paymentMethods: Array<{
    name: string
    checksForChange?: boolean
    imgSrc?: string
    description?: string
  }>
  items: Array<{
    headline?: string
    imgSrc?: string
    // To be markdown!
    description?: string
    live: boolean
    name: string
    price: number
    items?: string[]
  }>
  // won't happen
  menus: Menu[]
  categories?: Category[]
  templateAssembly: Assembly[]
  selectedMenu: number
}

export interface Menu {
  id?: string
  name: string
  slug: string
  categories: Category[]
}

export interface Category {
  id?: string
  name: string
  slug: string
  live: boolean
  products?: Product[]
}

export interface Product {
  id?: string
  // Loosely coupled
  category: {
    id: string
    name: string
  }
  name: string
  description?: string
  live: boolean
  price: number
  imgSrc?: string
  highlight: boolean
  min?: number
  max?: number
  assemblyOptions?: Assembly[]
}

export type OrderProducts = [string, number, number]

export interface PaymentInfo {
  name: string
  change?: string
}

export interface Address {
  logradouro?: string
  bairro?: string
  numero?: string
  complemento?: string
}

// May change that later
export type AssemblyType = 'UNISELECT' | 'MULTISELECT' | 'TEXT'

export interface AssemblyOption {
  name: string
  description?: string
  price?: number
  live?: boolean
}

export interface Assembly {
  name: string
  live: boolean
  type: AssemblyType
  min?: number
  max?: number
  price?: number
  options: AssemblyOption[]
}

export interface CategoriesCollection
  extends Element<Element<TenantConfig['menus']>['categories']> {
  id: string
}

export type TenantContextState = {
  loading: boolean
  tenantId?: string
  tenant?: TenantConfig
  categories?: CategoriesCollection[]
  categoryLoading?: boolean
  products?: Product[]
  productsLoading?: boolean
}

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type TenantContextActions =
  | Action<'ADD_CATEGORY', { args: Category }>
  | Action<'EDIT_CATEGORY', { args: { categoryData: Category; index: number } }>
  | Action<'CATEGORY_START_LOADING'>
  | Action<'CATEGORY_STOP_LOADING'>
  | Action<'START_LOADING'>
  | Action<'STOP_LOADING'>
  | Action<'SET_TENANT', { args: TenantConfig }>
