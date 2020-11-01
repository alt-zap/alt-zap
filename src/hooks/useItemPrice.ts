import { OrderItemInput } from '../typings'

export const useItemPrice = (
  item: OrderItemInput,
  quantity: number
): number => {

  const productPrices = item.product.price

  const itemsPrice = item.selectedItems.reduce((acc, cur) => {
    item.product.assemblyOptions?.find((assembly) => assembly.name)
  }, 0)
}
