import React, { FC } from 'react'

import ProductImage from './ProductImage'
import QuantitySelector from './QuantitySelector'
import Real from '../Real'

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number]

type Props = {
  product: Omit<ArrayElement<TenantConfig['items']>, 'live'>
}

const ProductSummary: FC<Props> = ({
  product: { name, headline, price, imgSrc, description },
}) => {
  return (
    <div className="shadow-1 br3 flex pa3">
      <div className="w-34" style={{ minWidth: '110px' }}>
        {imgSrc ? (
          <ProductImage src={imgSrc} title={name} description={description} />
        ) : null}
      </div>
      <div className="flex flex-column ml3 justify-between">
        <div className="flex flex-column">
          <span
            className={`${name.length > 20 ? 'f4' : 'f3 fw2'}`}
            style={{ lineHeight: '25px' }}
          >
            {name}
          </span>
          <span className="f4 fw2 silver" style={{ lineHeight: '20px' }}>
            {headline}
          </span>
        </div>
        <span
          className="b black"
          style={{ marginBottom: '-6px', fontSize: '1.9rem' }}
        >
          <Real cents={price} />
        </span>
      </div>
      <div className="flex justify-end" style={{ flex: 1 }}>
        <QuantitySelector />
      </div>
    </div>
  )
}

export default ProductSummary
