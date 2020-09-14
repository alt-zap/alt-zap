import React, { FC } from 'react'

import { OrderContextProvider } from '../../contexts/order/OrderContext'

// eslint-disable-next-line react/display-name
export default (comp: () => FC) => (
  <OrderContextProvider>{comp()}</OrderContextProvider>
)
