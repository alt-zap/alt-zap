import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import RealInput from '../common/RealInput'

export default {
  title: 'common|RealInput',
  component: RealInput,
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withKnobs],
}

export const NoValue = () => <RealInput placeholder="Reais" />
export const OnzeReais = () => (
  <RealInput placeholder="Reais" value={text('Value', '')} />
)
