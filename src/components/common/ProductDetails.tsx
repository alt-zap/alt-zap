import React, { FC, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

import { Element } from '../../utils'

type Props = {
  product: Omit<Element<TenantConfig['items']>, 'live'>
}

const ProductDetails: FC<Props> = ({
  product: { imgSrc, name, description, headline, items },
}) => {
  const tempDescription = useMemo(() => (items ? items.join('\n\n') : ''), [
    items,
  ])

  return (
    <div className="flex flex-column items-center">
      <img src={imgSrc} alt={name} title={name} className="br2 shadow-1" />
      <span className="f2 tc">{name}</span>
      <span className="gray f4 tc">{headline}</span>
      {(description ?? tempDescription) && (
        <ReactMarkdown
          className="tc pt2"
          source={description ?? tempDescription}
        />
      )}
    </div>
  )
}

export default ProductDetails
