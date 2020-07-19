import React, { FC } from 'react'

type Props = {
  src?: string
  title: string
  onClick?: () => void
}

const ProductImage: FC<Props> = ({ src, onClick, title }) => {
  return (
    <div
      className="pointer"
      onClick={() => onClick?.()}
      onKeyPress={() => onClick?.()}
      role="button"
      tabIndex={0}
    >
      <img
        src={
          src ??
          'https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png'
        }
        alt={title}
        title={title}
        className="br3 shadow-1"
      />
    </div>
  )
}

export default ProductImage
