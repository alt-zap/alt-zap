import React from "react"
import Real from "./Real"

export default ({ order }) => (
  <div className="tc mt3">
    <span className="tc gray tracked-tight f6">ITEMS</span>
    <div className="flex flex-column">
      {order.map(([name, quantity, price]) => (
        <div className="flex justify-between">
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
