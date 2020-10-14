import React, { FC, useEffect, useMemo, useState, useCallback } from 'react'
import { List, Divider, Affix } from 'antd'
import slugify from 'slugify'

import ProductSummary from '../common/ProductSummary'
import MenuSearch from './MenuSearch'
import { useSearch } from './useSearch'
import { Product } from '../../typings'

export type UISection = {
  name: string
  slug: string
  products: Product[]
}
type Props = {
  sections: UISection[]
}

const ProductList: FC<Props> = ({ sections }) => {
  const { setQuery, filteredSections } = useSearch(sections)

  const [active, setActive] = useState(sections[0].slug)

  const sectionsRef = useMemo(() => {
    return sections.reduce((acc, cur) => {
      acc[cur.slug] = React.createRef()

      return acc
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  }, [sections])

  const onChangeSection = useCallback(
    (slug) => {
      const el = sectionsRef[slug].current

      if (!el) {
        return
      }

      const yOffset = -110
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    },
    [sectionsRef]
  )

  const shouldDisplayName = sections?.length > 1

  return (
    <div className="mt3">
      <h2 className="tc">Qual seu pedido?</h2>
      <div className="flex flex-column items-center">
        <div className="w-100">
          <Affix>
            <MenuSearch
              activeSection={active}
              onSection={onChangeSection}
              setQuery={setQuery}
              availableSections={sections}
            />
          </Affix>
        </div>
        {filteredSections.map((section) => (
          <ListSection
            setActive={setActive}
            refs={sectionsRef}
            shouldDisplayName={shouldDisplayName}
            key={section.slug}
            {...section}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList

interface SectionProps extends UISection {
  shouldDisplayName: boolean
  setActive: (slug: string) => void
  refs: Record<string, React.RefObject<HTMLDivElement>>
}

const ListSection: FC<SectionProps> = ({
  name,
  slug,
  products,
  shouldDisplayName,
  refs,
  setActive,
}) => {
  const ref = refs[slug]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(slug)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    ref?.current && observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, slug, setActive])

  return (
    <div
      id={slug}
      key={slug}
      ref={refs[slug]}
      className="w-100 flex flex-column items-center"
    >
      {shouldDisplayName && <Divider>{name}</Divider>}
      <List
        style={{ maxWidth: '500px', width: '100%' }}
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(product, i) => (
          <div className="pv2" key={slugify(`${product.name}-${i}`)}>
            <ProductSummary product={product} />
          </div>
        )}
      />
    </div>
  )
}
