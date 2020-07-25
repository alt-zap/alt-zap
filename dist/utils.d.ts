import React from 'react'
import { Address, OrderProducts } from './typings'
declare type Elements = HTMLInputElement | HTMLTextAreaElement
export declare const eSet: (
  fn: (data: string) => void
) => (e: React.ChangeEvent<Elements>) => void
export declare const log: (...msgs: any) => void
declare type GenerateLinkParams = {
  name: string
  address: Address
  order: OrderProducts[]
  payment: {
    label: string
    change?: string
  }
  total: number
  info?: string
  whatsapp: string
}
export declare const generateLink: ({
  name,
  address,
  order,
  payment,
  total,
  info,
  whatsapp,
}: GenerateLinkParams) => string
export declare function createCtx<A extends {} | null>(): readonly [
  () => A,
  React.Provider<A>
]
export declare type Element<
  ArrayType extends readonly unknown[]
> = ArrayType[number]
export {}
