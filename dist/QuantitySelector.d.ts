import { FC } from 'react'
declare type Props = {
  min?: number
  max?: number
  quantity: string
  onQuantity: (data: string) => void
}
declare const QuantitySelector: FC<Props>
export default QuantitySelector
