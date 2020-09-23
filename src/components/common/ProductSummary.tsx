import React, { FC, Fragment, useState } from 'react'
import { Modal } from 'antd'
import { isMobile } from 'react-device-detect'

import ProductImage from './ProductImage'
import Real from '../Real'
import ProductDetails from './ProductDetails'
import ProductQuantity from '../order/ProductQuantity'
import { Product } from '../../typings'

type Props = {
  product: Product
}

const ProductSummary: FC<Props> = ({
  product: { name, price, imgSrc, description },
  product,
}) => {
  const [detailsModalOpened, setDetailsModal] = useState(false)

  return (
    <Fragment>
      <div
        className={`shadow-1 br3 flex pa3 bg-white pointer ${
          isMobile ? '' : 'hvr-float'
        }`}
        onClick={() => setDetailsModal(true)}
        onKeyPress={() => setDetailsModal(true)}
        role="button"
        tabIndex={0}
      >
        {imgSrc && (
          <div className="w-34" style={{ width: '110px', minWidth: '110px' }}>
            <ProductImage
              src={imgSrc}
              title={name}
              onClick={() => setDetailsModal(true)}
            />
          </div>
        )}
        <div className="flex flex-column ml3 justify-between">
          <div className="flex flex-column">
            <span
              className={`${name.length > 20 ? 'f4' : 'f3 fw2'}`}
              style={{ lineHeight: '25px' }}
            >
              {name}
            </span>
            <span className="f5 fw2 silver" style={{ lineHeight: '20px' }}>
              {`${description?.substring(0, 50)}${
                (description?.length ?? 0) > 50 ? '...' : ''
              }`}
            </span>
          </div>
          <span className="b black f3" style={{ marginBottom: '-6px' }}>
            <Real cents={price} />
          </span>
        </div>
        <div className="flex justify-end" style={{ flex: 1 }}>
          <ProductQuantity product={product} />
        </div>
      </div>
      <Modal
        title={name}
        footer={null}
        onCancel={() => setDetailsModal(false)}
        visible={detailsModalOpened}
      >
        <ProductDetails product={product} />
      </Modal>
    </Fragment>
  )
}

export default ProductSummary
