export type Element<ArrayType extends readonly unknown[]> = ArrayType[number]

export interface TenantConfig {
  migrated?: boolean
  showOnClose?: boolean
  name: string
  slug: string
  category?: string
  userId: string
  whatsapp: string
  instagram?: string
  logoSrc?: string
  color?: string
  live: boolean
  deliveryFee: number
  paymentMethods: PaymentMethod[]
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
  categories?: Category[]
  templateAssembly?: Assembly[]
  selectedMenu?: number
  address?: WorldAddress
  shippingStrategies?: ShippingStrategies
  openingHours?: OpeningHours
  sites?: Sites
}

export type Section<T> = {
  element: T
  visible: boolean
}

export type Sites = {
  zap: {
    categoryIds: Array<Section<number>>
    productMap: Record<number, Array<Section<string>>>
  }
}

export type PaymentMethod = {
  name: string
  checksForChange?: boolean
  imgSrc?: string
  description?: string
}

export type OpeningHours = {
  intervals: TimeFrame[]
}

export type Days =
  | 'ALL'
  | 'WEEKDAYS'
  | 'WEEKEND'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

export type TimeFrame = {
  days: Days
  from: string
  to: string
}

export type ShippingMethod = 'DELIVERY' | 'TAKEAWAY'

export type ShippingStrategies = {
  deliveryFixed: {
    price?: number
    active: boolean
  }
  takeaway: {
    active: boolean
  }
  dynamicFee: {
    active: boolean
  }
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
  userId: string
  category: number
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

export type WorldAddress = {
  postalCode?: string
  street: string
  number: string
  district: string
  complement?: string
  city: string
  state: string
  country?: string
  lat?: number
  lng?: number
  additionalInfo?: string
}

// May change that later
export type AssemblyType = 'REPEAT' | 'SINGLE' | 'TEXT'

export interface AssemblyOption {
  name: string
  description?: string
  initialQuantity?: number
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
  // On some initial cases, there were no options. We don't want that
  options?: AssemblyOption[]
}

export interface CategoriesCollection extends Category {
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

export type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type AssemblyForm = {
  [itemName: string]: {
    [optionName: string]: string
  }
}

export type OrderItem = {
  product: Product
  quantity: number
  info?: string
  selectedItems: Array<{
    name: string
    options: Array<{
      name: string
      quantity: number
    }>
  }>
  itemPrice: number
}

export type OrderTypes = 'INDOOR' | 'HOME'

export type Order = {
  id?: string
  date: string
  type?: OrderTypes
  items: OrderItem[]
  info?: string
  customer?: {
    name: string
  }
  shipping?: {
    type: ShippingMethod
    address?: WorldAddress
    price?: number
  }
  payment?: {
    type: PaymentMethod
    changeFor?: string
  }
  totalizers?: {
    shippingPrice?: number
    totalPrice?: number
    finalPrice?: number
  }
}
