/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Modal from 'antd/lib/modal/Modal'

import OrderItem from '../order/OrderItem'
import withIntl from './withIntl'
import SelectAddress from '../common/SelectAddress'

export default {
  title: 'common/SelectAddress',
  component: OrderItem,
  decorators: [
    withIntl,
    (Comp: React.FC) => (
      <Modal visible>
        <Comp />
      </Modal>
    ),
  ],
}

export const NoAddresses = () => (
  <SelectAddress onValidAddress={(a) => console.log(a)} />
)
