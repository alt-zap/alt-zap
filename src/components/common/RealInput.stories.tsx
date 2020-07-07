import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import RealInput from './RealInput'

export default {
  title: 'common|RealInput',
  component: RealInput,
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withKnobs],
}

export const NoValue = () => <RealInput />
export const OnzeReais = () => <RealInput value={text('Value', '')} />
