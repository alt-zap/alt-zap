import React, { FC } from 'react'

import { Order, OrderItem } from '../typings'
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
      <div className="flex flex-column tl">
        {order.items
          .filter(({ quantity }) => Boolean(quantity))
          .map((item, i) => (
            <div className="flex justify-between" key={i}>
              <div className="flex flex-column">
                <span className="gray">{`${item.quantity} x ${item.product.name}`}</span>
                <ItemDetails item={item} />
              </div>
              <div>
                <span>
                  <Real cents={item.itemPrice} />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

const ItemDetails: FC<{ item: OrderItem }> = ({ item }) => (
  <>
    {item.selectedItems
      ?.filter(({ options }) =>
        options.some(({ quantity }) => Boolean(quantity))
      )
      .map(({ name, options }) => {
        const optionsToDisplay = options.filter(({ quantity }) => quantity > 0)

        const messageForOptions =
          optionsToDisplay.length === 1 && optionsToDisplay[0].quantity === 1
            ? optionsToDisplay[0].name
            : optionsToDisplay
                .map(({ name: _name, quantity }) => `${_name}(${quantity})`)
                .join(' - ')

        return (
          <span className="gray pl3" key={name}>
            <b>{name}</b>: <span>{messageForOptions}</span>
          </span>
        )
      })}
    {!!item?.info?.length && (
      <span className="gray pl3">
        <b>Obs: </b>
        {item.info}
      </span>
    )}
  </>
)

export default OrderSummary
