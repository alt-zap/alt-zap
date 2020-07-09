import React, { FC } from 'react'

/**
 * Styles for the top button
 * width: 30px;
    border-radius: 8px 8px 0 0;
    border-color: transparent;
    background-color: #041527;
    color: white;
    font-size: 25px;
    padding: 0;
    font-weight: bolder;
 */
const QuantitySelector: FC = () => {
  return (
    <div className="flex flex-column">
      <button>+</button>
      <input type="text" value="0" />
      <button>+</button>
    </div>
  )
}

export default QuantitySelector
