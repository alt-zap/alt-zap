import React, { useState, useEffect } from "react"
import Real from "./Real"

export default ({ order, deliveryFee, onTotal }) => {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const totalOrder = order.reduce(
      (acc, [, quantity, price]) => acc + quantity * price,
      0
    )
    const sum = totalOrder + deliveryFee
    setTotal(sum)
    onTotal && onTotal(sum)
  }, [order, deliveryFee, onTotal])

  return (
    <div className="flex justify-center w-100">
      <div className="w-100 bg-washed-blue h-100 pa3 br3 shadow-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-column justify-center">
            <b>Total:</b>
            <span className="light-silver f6">
              Entrega: <Real cents={deliveryFee} />
            </span>
          </div>
          <span className="f4 b">
            <Real cents={total} />
          </span>
        </div>
      </div>
    </div>
  )
}
