import React, { FC, useState, useEffect } from 'react'

import Real from './Real'
import { ShippingStrategies } from '../typings'
import { ShippingMethod } from './order/SelectShipping'

type Props = {
  order: Array<[string, number, number]>
  methods?: ShippingStrategies
  selectedMethod: ShippingMethod | null
  deliveryFee: number
  onTotal: (total: number) => void
}

const Totalizer: FC<Props> = ({
  order,
  deliveryFee,
  onTotal,
  methods,
  selectedMethod,
}) => {
  const [total, setTotal] = useState(0)

  const onlyHasDelivery =
    methods?.deliveryFixed?.active && !methods?.takeaway?.active

  const onlyHasTakeAway =
    methods?.takeaway?.active && !methods?.deliveryFixed?.active

  const isDelivery = selectedMethod === 'delivery' || onlyHasDelivery
  const isTakeaway = selectedMethod === 'takeaway' || onlyHasTakeAway

  const fee = isDelivery ? methods?.deliveryFixed?.price ?? 0 : 0

  // We shouldn't be doing this. We'll compute the total price on a top
  // level component (check OrderItems components).
  //
  // In fact, this piece of code makes me angry because we have to account for
  // the cases where we set the shipping initial value, but the top-lever Order
  // doesn't get an update (coming from the Form/)
  useEffect(() => {
    const totalOrder = order.reduce(
      (acc, [, quantity, price]) => acc + quantity * price,
      0
    )

    const sum = totalOrder + fee

    setTotal(sum)
    onTotal?.(sum)
  }, [order, deliveryFee, onTotal, fee])

  return (
    <div className="flex justify-center w-100">
      <div className="w-100 bg-washed-blue h-100 pa3 br3 shadow-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-column justify-center">
            <b>Total:</b>
            <span className="light-silver f6">
              {isTakeaway && `Retirada Grátis`}
              {isDelivery && fee > 0 && (
                <span>
                  Entrega: <Real cents={deliveryFee} />
                </span>
              )}
              {isDelivery && fee === 0 && 'Entrega Grátis'}
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

export default Totalizer
