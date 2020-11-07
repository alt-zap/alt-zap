import React, { FC } from 'react'

type Props = { width: string }
const BackIcon: FC<Props> = ({ width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      fill="currentColor"
      viewBox="0 0 13 11"
    >
      <path d="M1 5.5l-.747-.664a1 1 0 000 1.328L1 5.5zm11 1a1 1 0 100-2v2zM5.747 1.664A1 1 0 104.253.336l1.494 1.328zm-1.494 9a1 1 0 001.494-1.328l-1.494 1.328zM1 6.5h11v-2H1v2zm.747-.336l4-4.5L4.253.336l-4 4.5 1.494 1.328zm-1.494 0l4 4.5 1.494-1.328-4-4.5L.253 6.164z" />
    </svg>
  )
}

export default BackIcon
