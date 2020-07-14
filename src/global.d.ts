declare interface TenantConfig {
  name: string
  slug: string
  userId: string
  whatsapp: string
  instagram?: string
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
}

declare interface PaymentInfo {
  name: string
  change?: string
}

declare interface Address {
  logradouro?: string
  bairro?: string
  numero?: string
  complemento?: string
}

// May change that later
declare type AssemblyType = 'UNISELECT' | 'MULTISELECT' | 'TEXT'

declare interface AssemblyOption {
  name: string
  description?: string
  price?: number
  live?: boolean
}

declare interface Assembly {
  name: string
  live: boolean
  type: AssemblyType
  min?: number
  max?: number
  price?: number
  options: AssemblyOption[]
}

declare module '@rjsf/antd'
