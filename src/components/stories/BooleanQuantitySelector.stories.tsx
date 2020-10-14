import React from 'react'
import { State, Store } from '@sambego/storybook-state'

import BooleanQuantitySelector from '../common/BooleanQuantitySelector'

export default {
  title: 'common/BooleanQuantitySelector',
  component: BooleanQuantitySelector,
}

const quantityStore = new Store({
  quantity: '0',
  onQuantity: (e: string) => {
    quantityStore.set({ quantity: e })
  },
})

export const Default = () => (
  <div className="pa2 flex justify-end">
    <State store={quantityStore}>
      <BooleanQuantitySelector />
    </State>
  </div>
)
