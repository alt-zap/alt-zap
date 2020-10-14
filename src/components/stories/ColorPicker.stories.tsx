import React from 'react'

import ColorPicker from '../common/ColorPicker'

export default {
  title: 'common/ColorPicker',
  component: ColorPicker,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const NoValue = () => <ColorPicker />
export const WithColor = () => (
  // eslint-disable-next-line no-console
  <ColorPicker value="#ccc" onChange={(a) => console.log(a)} />
)
