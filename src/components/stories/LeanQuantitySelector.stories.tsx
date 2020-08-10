import React from 'react'
import { State, Store } from '@sambego/storybook-state'

import LeanQuantitySelector from '../common/LeanQuantitySelector'

export default {
  title: 'common|LeanQuantitySelector',
  component: LeanQuantitySelector,
}

const quantityStore = new Store({
  quantity: '2',
  onQuantity: (e: string) => {
    quantityStore.set({ quantity: e })
  },
})

export const Default = () => (
  <div className="pa2 flex justify-end">
    <State store={quantityStore}>
      <LeanQuantitySelector />
    </State>
  </div>
)
