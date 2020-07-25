import React from 'react'
const ProductImage = ({ src, onClick, title }) => {
  return React.createElement(
    'div',
    {
      className: 'pointer',
      onClick: () => {
        var _a
        return (_a = onClick) === null || _a === void 0 ? void 0 : _a()
      },
      onKeyPress: () => {
        var _a
        return (_a = onClick) === null || _a === void 0 ? void 0 : _a()
      },
      role: 'button',
      tabIndex: 0,
    },
    React.createElement('img', {
      src:
        src !== null && src !== void 0
          ? src
          : 'https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png',
      alt: title,
      title: title,
      className: 'br3 shadow-1',
    })
  )
}
export default ProductImage
