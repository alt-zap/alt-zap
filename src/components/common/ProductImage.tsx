import React, { FC } from 'react'

type Props = {
  src: string
  title: string
  onClick: () => void
}

const ProductImage: FC<Props> = ({ src, onClick, title }) => {
  return (
    <div
      className="pointer dim"
      onClick={() => onClick()}
      onKeyPress={() => onClick()}
      role="button"
      tabIndex={0}
    >
      <img src={src} alt={title} title={title} className="br3" />
    </div>
  )
}

export default ProductImage
