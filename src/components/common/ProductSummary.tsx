import React, { FC, useMemo } from 'react'

import { useAltIntl } from '../../intlConfig'
import { Product } from '../../typings'
import { shouldDisplayFrom, productMinimalPrice } from '../../utils/assembly'
import Real from '../Real'
import ProductImage from './ProductImage'

type Props = {
  product: Product
  onClick?: () => void
}

const ProductSummary: FC<Props> = ({
  product: { name, imgSrc, description },
  product,
  onClick,
}) => {
  const { formatMessage } = useAltIntl()
  const displayFrom = useMemo(() => shouldDisplayFrom(product), [product])
  const productPrice = useMemo(() => productMinimalPrice(product), [product])

  return (
    <div
      className="shadow-1 br3 flex pa3 bg-white pointer"
      onClick={() => onClick?.()}
      onKeyPress={() => onClick?.()}
      role="button"
      tabIndex={0}
    >
      {imgSrc && (
        <div className="w-34" style={{ width: '110px', minWidth: '110px' }}>
          <ProductImage src={imgSrc} title={name} onClick={() => onClick?.()} />
        </div>
      )}
      <div className="flex flex-column ml3 justify-between">
        <div className="flex flex-column">
          <span className="f3" style={{ lineHeight: '25px' }}>
            {name}
          </span>
          <span className="f5 fw2 silver" style={{ lineHeight: '20px' }}>
            {`${description?.substring(0, 50) ?? ''}${
              (description?.length ?? 0) > 50 ? '...' : ''
            }`}
          </span>
        </div>
        <div className="flex flex-column">
          {displayFrom && (
            <span className="grey f6" style={{ marginBottom: '-6px' }}>
              {formatMessage({ id: 'order.product.priceFrom' })}
            </span>
          )}
          <span className="grey f3" style={{ marginBottom: '-6px' }}>
            <Real cents={productPrice} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductSummary
