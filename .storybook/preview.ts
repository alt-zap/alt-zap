import { configure } from '@storybook/react'

import 'antd/dist/antd.css'

configure(
  require.context('../src/components/common', true, /\.stories\.tsx$/),
  module
)
