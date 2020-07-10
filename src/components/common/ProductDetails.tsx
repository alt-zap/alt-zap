import React, { FC } from 'react'

import { Element } from '../../utils'

type Props = {
  product: Omit<Element<TenantConfig['items']>, 'live'>
}

const ProductDetails: FC<Props> = ({
  product: { imgSrc, name, description, headline },
}) => {
  return (
    <div className="flex flex-column items-center">
      <img src={imgSrc} alt={name} title={name} className="br2 shadow-1" />
      <span className="f2 tc">{name}</span>
      <span className="gray f4 tc">{headline}</span>
      <span className="tc">{description}</span>
    </div>
  )
}

export default ProductDetails
