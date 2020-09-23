import React, { FC } from 'react'

import { Order } from '../typings'
import Real from './Real'

type Props = {
  order: Order | null
}

const OrderSummary: FC<Props> = ({ order }) => {
  if (!order) {
    return null
  }

  return (
    <div className="tc mt3">
      <span className="tc gray tracked-tight f6">ITEMS</span>
      <div className="flex flex-column">
        {order.items
          .filter(({ quantity }) => Boolean(quantity))
          .map(({ product, quantity, itemPrice }, i) => (
            <div className="flex justify-between" key={i}>
              <div>
                <span className="gray">{`${quantity} x ${product.name}`}</span>
              </div>
              <div>
                <span>
                  <Real cents={itemPrice} />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default OrderSummary
