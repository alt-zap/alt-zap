import React, { FC } from 'react'

import Real from './Real'

type Props = {
  order: Array<[string, number, number]>
}

const OrderSummary: FC<Props> = ({ order }) => (
  <div className="tc mt3">
    <span className="tc gray tracked-tight f6">ITEMS</span>
    <div className="flex flex-column">
      {order.map(([name, quantity, price]) => (
        <div className="flex justify-between" key={name}>
          <div>
            <span className="gray">{`${quantity} x ${name}`}</span>
          </div>
          <div>
            <span>
              <Real cents={quantity * price} />
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default OrderSummary
