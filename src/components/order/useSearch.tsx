import { useState, useMemo } from 'react'
import fuzzysearch from 'fuzzysearch'

import { Product } from '../../typings'

type Section = {
  name: string
  slug: string
  products: Product[]
}

export const useSearch = (sections: Section[]) => {
  const [query, setQuery] = useState<string | null>(null)

  const filteredSections = useMemo(() => {
    if (!query) return sections

    return sections
      .map(({ products, ...rest }) => {
        return {
          ...rest,
          products: products.filter(({ name }) =>
            fuzzysearch(query.toLowerCase(), name.toLowerCase())
          ),
        }
      })
      .filter(({ products }) => !!products.length)
  }, [query, sections])

  return {
    filteredSections,
    setQuery,
  }
}
