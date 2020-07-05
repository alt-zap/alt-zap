declare interface TenantConfig {
  name: string
  slug: string
  userId: string
  whatsapp: string
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

declare module '@rjsf/antd'
