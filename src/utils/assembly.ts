import { Product } from '../typings'

export const shouldDisplayFrom = (product: Product) => {
  return product.assemblyOptions?.some((field) => {
    return !!field.price || field.options?.some((option) => !!option.price)
  })
}

export const productMinimalPrice = (product: Product) => {
  const basePrice = product.price ?? 0

  const assemblyMinimalPrice =
    product.assemblyOptions?.reduce((acc, cur) => {
      const isRequired = (cur.min ?? 0) > 0

      if (!isRequired) return acc

      const cheapestOptionPrice =
        cur.options?.reduce(
          (_acc, _cur) => Math.min(_cur.price ?? 0, _acc),
          cur?.options?.[0].price ?? 0
        ) ?? 0

      return (cur.price ?? 0) + (cheapestOptionPrice ?? 0) + acc
    }, 0) ?? 0

  return basePrice + assemblyMinimalPrice
}
