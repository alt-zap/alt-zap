import React, { FC, useCallback, useMemo } from 'react'

type Props = {
  min?: number
  max?: number
  quantity?: string
  onQuantity?: (data?: string) => void
  disabled?: boolean
}

const dimension = '28px'

const LeanQuantitySelector: FC<Props> = ({
  min = 0,
  max = 20,
  quantity,
  onQuantity,
  disabled,
}) => {
  const inc = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const val = parseInt(quantity ?? '0', 10)

      onQuantity?.(val >= max ? quantity : `${val + 1}`)
      e.stopPropagation()
    },
    [onQuantity, quantity, max]
  )

  const dec = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const val = parseInt(quantity ?? '0', 10)

      onQuantity?.(val <= min ? quantity : `${val - 1}`)
      e.stopPropagation()
    },
    [onQuantity, quantity, min]
  )

  const initialState = useMemo(() => parseInt(quantity ?? '0', 10) <= min, [
    quantity,
    min,
  ])

  return (
    <div className="flex">
      {!initialState && (
        <button
          className="pointer shadow-1 flex justify-center items-center"
          style={{
            width: dimension,
            height: dimension,
            borderRadius: '10px 0 0 10px',
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
          type="button"
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
      )}
      {!initialState && (
        <input
          type="text"
          readOnly
          className="tc bn shadow-1 f5"
          value={quantity}
          style={{
            width: dimension,
            height: dimension,
          }}
        />
      )}

      <button
        type="button"
        className="pointer shadow-1 flex justify-center items-center"
        style={{
          width: dimension,
          height: dimension,
          borderRadius: initialState ? '8px' : '0 8px 8px 0',
          borderColor: 'transparent',
          backgroundColor:
            !disabled ?? parseInt(quantity || '0', 10) !== max
              ? '#041527'
              : 'rgba(105, 114, 123,1)',
          color: 'white',
          fontSize: '25px',
          padding: 0,
          fontWeight: 'bolder',
        }}
        disabled={disabled ?? parseInt(quantity ?? '0', 10) === max}
        onClick={inc}
      >
        <svg
          width="10"
          height="10"
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
    </div>
  )
}

export default LeanQuantitySelector
