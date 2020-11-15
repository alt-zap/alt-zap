import React, { FC, useEffect, useMemo, useState, useCallback } from 'react'
import { List, Divider, Affix, Modal, message } from 'antd'
import slugify from 'slugify'

import MenuSearch from './MenuSearch'
import { useSearch } from './useSearch'
import OrderItem from './OrderItem'
import { useAltModal } from '../../hooks/useAltModal'
import { useOrderDispatch } from '../../contexts/order/OrderContext'
import { OrderItem as IOrderItem, Product } from '../../typings'
import ProductSummary from '../common/ProductSummary'

export type UISection = {
  name: string
  slug: string
  products: Product[]
}
type Props = {
  sections: UISection[]
}

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })

const ProductList: FC<Props> = ({ sections }) => {
  const { setQuery, filteredSections } = useSearch(sections)

  const [active, setActive] = useState<string | null>(sections?.[0]?.slug)

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
      <div className="flex flex-column items-center">
        <div className="w-100">
          <Affix>
            {active && (
              <MenuSearch
                activeSection={active}
                onSection={onChangeSection}
                setQuery={setQuery}
                availableSections={sections}
              />
            )}
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
  const { show, close, modalProps } = useAltModal(`productDetails-${slug}`)
  const [setSimulatedLoading, setLoading] = useState(false)
  const [selectedProduct, setProduct] = useState<Product | null>(null)
  const dispatch = useOrderDispatch()

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

  const onAddItem = useCallback(
    (item: IOrderItem) => {
      setLoading(true)

      dispatch({ type: 'ADD_ITEM', args: item })
      wait(500).then(() => {
        setLoading(false)
        close()

        message.success('Item adicionado com sucesso')
      })
    },
    [setLoading, close, dispatch]
  )

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
            <ProductSummary
              product={product}
              onClick={() => {
                setProduct(product)
                show()
              }}
            />
          </div>
        )}
      />
      <Modal
        className="customModal"
        title={selectedProduct?.name ?? ''}
        footer={null}
        {...modalProps}
      >
        <div>
          {!!selectedProduct && (
            <OrderItem
              product={selectedProduct}
              onAddItem={onAddItem}
              loading={setSimulatedLoading}
            />
          )}
        </div>
      </Modal>
    </div>
  )
}
