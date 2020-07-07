import React from 'react'

import RealInput from './RealInput'

export default {
  title: 'common|RealInput',
  component: RealInput,
  decorators: [(story) => <div className="pa2">{story()}</div>],
}

export const NoValue = () => <RealInput />
export const OnzeReais = () => <RealInput value="11,00" />
