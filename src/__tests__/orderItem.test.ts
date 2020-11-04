import { calculateItemPrice, mapFormToAssembly } from '../functions/orderItem'
import { OrderItem, Product } from '../typings'

const NoAssemblyProduct: Pick<Product, 'price'> = {
  price: 1000,
}

test('no assembly with quantity', () => {
  const totalPrice = calculateItemPrice({
    product: NoAssemblyProduct as Product,
    quantity: 1,
    selectedItems: [],
  })

  expect(totalPrice).toEqual(1000)
})
// assembly with "base" price

// assemlby with no base price

// more than one item

// three types of assembly (unique, select...)

const assertAboutAssemblyAndSelectedItems = (
  assembly: Record<string, Record<string, string>>,
  selectedItems: OrderItem['selectedItems']
) => {
  expect(selectedItems).toHaveLength(Object.keys(assembly).length)

  Object.keys(assembly).forEach((assemblyName) => {
    const item = selectedItems.find(({ name }) => name === assemblyName)

    expect(item).toBeTruthy()

    if (!item) return

    const assemblyOption = assembly[assemblyName as keyof typeof assembly]

    expect(Object.keys(assemblyOption)).toHaveLength(item.options.length)

    Object.keys(assemblyOption).forEach((optionName) => {
      const option = item.options.find(({ name }) => name === optionName)

      expect(option).toBeTruthy()
      expect(option?.quantity).toEqual(
        parseInt(assemblyOption[optionName as keyof typeof assemblyOption], 10)
      )
    })
  })
}

test('mapFormToAssembly no assembly', () => {
  expect(mapFormToAssembly({})).toEqual([])
})

test('mapFormToAssembly adicionais', () => {
  const assembly = {
    Adicionais: {
      Bacon: '2',
      'Pimenta Calabresa': '0',
      Nata: '0',
    },
  }

  const selectedItems = mapFormToAssembly(assembly)

  expect(true).toBeTruthy()

  assertAboutAssemblyAndSelectedItems(assembly, selectedItems)
})

test('mapFormToAssembly tamanho', () => {
  const assembly = {
    Tamanho: {
      Médio: '1',
    },
  }

  const selectedItems = mapFormToAssembly(assembly)

  expect(true).toBeTruthy()

  assertAboutAssemblyAndSelectedItems(assembly, selectedItems)
})

test('mapFormToAssembly tamanho e adicionais', () => {
  const assembly = {
    Adicionais: {
      Bacon: '2',
      'Pimenta Calabresa': '0',
      Nata: '0',
    },
    Tamanho: {
      Médio: '1',
    },
  }

  const selectedItems = mapFormToAssembly(assembly)

  expect(true).toBeTruthy()

  assertAboutAssemblyAndSelectedItems(assembly, selectedItems)
})
