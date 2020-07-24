import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'

import CurrencyInput from '../common/CurrencyInput'

export default {
  title: 'common|CurrencyInput',
  component: CurrencyInput,
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withKnobs],
}

const store = new Store({
  value: 1000,
  onChange: (e: any) => {
    store.set({ value: e.target.value })
  },
})

export const WithForm = () => (
  <State store={store}>
    <CurrencyInput addonBefore="R$" />
  </State>
)
