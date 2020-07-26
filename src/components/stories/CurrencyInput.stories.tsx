/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { State, Store } from '@sambego/storybook-state'

import CurrencyInput from '../common/CurrencyInput'

export default {
  title: 'common|CurrencyInput',
  component: CurrencyInput,
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withKnobs],
}

const numberStore = new Store({
  value: 1000,
  onChange: (e: any) => {
    numberStore.set({ value: e.target.value })
  },
})

export const UsingNumber = () => (
  <State store={numberStore}>
    <CurrencyInput addonBefore="R$" />
  </State>
)

numberStore.subscribe((a) => console.log({ numberStore: a }))

const stringStore = new Store({
  value: '',
  onChange: (e: any) => {
    stringStore.set({ value: e.target.value })
  },
})

export const UsingString = () => (
  <State store={stringStore}>
    <CurrencyInput addonBefore="R$" valueAsString />
  </State>
)

stringStore.subscribe((a) => console.log({ stringStore: a }))
