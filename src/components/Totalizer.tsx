import React from 'react'

import { Order } from '../typings'
import Real from './Real'

type Props = {
  order: Order | null
}

const Totalizer = React.forwardRef<HTMLDivElement, Props>(
  function WrappedTotalizer({ order }, ref) {
    const selectedMethod = order?.shipping?.type
    const isDelivery = selectedMethod === 'DELIVERY'
    const isTakeaway = selectedMethod === 'TAKEAWAY'

    const fee = order?.shipping?.price ?? 0

    return (
      <div ref={ref} className="flex justify-center w-100">
        <div className="w-100 bg-washed-blue h-100 pa3 br3 shadow-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-column justify-center">
              <b>Total:</b>
              <span className="light-silver f6">
                {isTakeaway && `Retirada Grátis`}
                {isDelivery && fee > 0 && (
                  <span>
                    Entrega: <Real cents={fee} />
                  </span>
                )}
                {isDelivery && fee === 0 && 'Entrega Grátis'}
              </span>
            </div>
            <span className="f4 b">
              <Real cents={order?.totalizers?.finalPrice ?? 0} />
            </span>
          </div>
        </div>
      </div>
    )
  }
)

export default Totalizer
