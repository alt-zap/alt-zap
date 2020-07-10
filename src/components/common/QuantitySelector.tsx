import React, { FC, useCallback } from 'react'

type Props = {
  min?: number
  max?: number
  quantity: string
  onQuantity: (data: string) => void
}

const QuantitySelector: FC<Props> = ({
  min = 0,
  max = 20,
  quantity,
  onQuantity,
}) => {
  const inc = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const val = parseInt(quantity, 10)

      onQuantity(val >= max ? quantity : `${val + 1}`)
      e.stopPropagation()
    },
    [onQuantity, quantity, max]
  )

  const dec = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const val = parseInt(quantity, 10)

      onQuantity(val <= min ? quantity : `${val - 1}`)
      e.stopPropagation()
    },
    [onQuantity, quantity, min]
  )

  return (
    <div className="flex flex-column">
      <button
        className="pointer shadow-1 flex justify-center items-center"
        style={{
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
        }}
        disabled={parseInt(quantity, 10) === max}
        onClick={inc}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="9.2002" width="4.6" height="23" fill="white" />
          <rect
            y="13.8"
            width="4.6"
            height="23"
            transform="rotate(-90 0 13.8)"
            fill="white"
          />
        </svg>
      </button>
      <input
        type="text"
        readOnly
        className="tc bn shadow-1 f4"
        value={quantity}
        style={{
          width: '36.6px',
        }}
      />
      <button
        className="pointer shadow-1 flex justify-center items-center"
        style={{
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
        }}
        disabled={!quantity || parseInt(quantity, 10) === min}
        onClick={dec}
      >
        <svg
          width="13"
          height="7"
          viewBox="0 0 23 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="4.80005"
            width="4.6"
            height="23"
            transform="rotate(-90 0 4.80005)"
            fill="white"
          />
        </svg>
      </button>
    </div>
  )
}

export default QuantitySelector
