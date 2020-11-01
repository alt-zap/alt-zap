import { calculateItemPrice } from '../functions/calculateItemPrice'
import { Product } from '../typings'

const NoAssemblyProduct: Pick<Product, 'price'> = {
  price: 1000,
}

test('no assembly with quantity', () => {
  const totalPrice = calculateItemPrice(
    {
      product: NoAssemblyProduct as Product,
      quantity: 1,
      selectedItems: [],
    },
    1
  )

  expect(totalPrice).toEqual(1000)
})
