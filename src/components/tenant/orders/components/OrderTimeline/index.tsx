import React, { FC } from 'react'
import { Order } from '@src/typings'
import { Timeline } from 'antd'

import { useOrderTimeline } from './hooks'

interface Props {
  order: Order
}

const OrderTimeline: FC<Props> = ({ order }) => {
  const items = useOrderTimeline(order)

  return (
    <Timeline>
      {items.map((props, i) => (
        <Timeline.Item key={i} {...props} />
      ))}
    </Timeline>
  )
}

export { OrderTimeline }
