import React, { FC } from 'react'

import ProductImage from './ProductImage'
import Real from '../Real'

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number]

type Props = {
  product: ArrayElement<TenantConfig['items']>
}

const ProductSummary: FC<Props> = ({
  product: { name, headline, price, imgSrc },
}) => {
  return (
    <div className="shadow-1 br3 flex pa3">
      <div className="w-34">
        <ProductImage src={imgSrc} aspectRatio />
      </div>
      <div className="flex flex-column ml3 justify-between">
        <div className="flex flex-column">
          <span className="f3 fw2" style={{ marginTop: '-6px' }}>
            {name}
          </span>
          <span className="f4 fw2 silver" style={{ marginTop: '-5px' }}>
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
    </div>
  )
}

export default ProductSummary
