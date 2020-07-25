import React, { useCallback } from 'react'
const QuantitySelector = ({ min = 0, max = 20, quantity, onQuantity }) => {
  const inc = useCallback(
    (e) => {
      const val = parseInt(quantity, 10)
      onQuantity(val >= max ? quantity : `${val + 1}`)
      e.stopPropagation()
    },
    [onQuantity, quantity, max]
  )
  const dec = useCallback(
    (e) => {
      const val = parseInt(quantity, 10)
      onQuantity(val <= min ? quantity : `${val - 1}`)
      e.stopPropagation()
    },
    [onQuantity, quantity, min]
  )
  return React.createElement(
    'div',
    { className: 'flex flex-column' },
    React.createElement(
      'button',
      {
        className: 'pointer shadow-1 flex justify-center items-center',
        style: {
          width: '36.6px',
          height: '36.6px',
          borderRadius: '10px 10px 0 0',
          borderColor: 'transparent',
          backgroundColor:
            parseInt(quantity, 10) !== max
              ? '#041527'
              : 'rgba(105, 114, 123,1)',
          color: 'white',
          fontSize: '25px',
          padding: 0,
          fontWeight: 'bolder',
        },
        disabled: parseInt(quantity, 10) === max,
        onClick: inc,
      },
      React.createElement(
        'svg',
        {
          width: '13',
          height: '13',
          viewBox: '0 0 23 23',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        React.createElement('rect', {
          x: '9.2002',
          width: '4.6',
          height: '23',
          fill: 'white',
        }),
        React.createElement('rect', {
          y: '13.8',
          width: '4.6',
          height: '23',
          transform: 'rotate(-90 0 13.8)',
          fill: 'white',
        })
      )
    ),
    React.createElement('input', {
      type: 'text',
      readOnly: true,
      className: 'tc bn shadow-1 f4',
      value: quantity,
      style: {
        width: '36.6px',
      },
    }),
    React.createElement(
      'button',
      {
        className: 'pointer shadow-1 flex justify-center items-center',
        style: {
          width: '36.6px',
          height: '36.6px',
          borderRadius: '0 0 10px 10px',
          borderColor: 'transparent',
          backgroundColor:
            !quantity || parseInt(quantity, 10) === min
              ? 'rgba(105, 114, 123,1)'
              : '#041527',
          color: 'white',
          fontSize: '25px',
          padding: 0,
          fontWeight: 'bolder',
        },
        disabled: !quantity || parseInt(quantity, 10) === min,
        onClick: dec,
      },
      React.createElement(
        'svg',
        {
          width: '13',
          height: '7',
          viewBox: '0 0 23 5',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        React.createElement('rect', {
          y: '4.80005',
          width: '4.6',
          height: '23',
          transform: 'rotate(-90 0 4.80005)',
          fill: 'white',
        })
      )
    )
  )
}
export default QuantitySelector
