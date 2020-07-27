import { configure } from '@storybook/react'
import { addParameters } from '@storybook/client-api'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import 'antd/dist/antd.css'
import './font.css'
import 'tachyons/css/tachyons.min.css'

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
})

configure(
  [require.context('../src/components/stories', true, /\.stories\.tsx$/)],
  module
)
