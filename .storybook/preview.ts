import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import 'antd/dist/antd.css'
import './styles.css'
import 'tachyons/css/tachyons.min.css'

const preview: Preview = {
  parameters: {
    viewport: { viewports: INITIAL_VIEWPORTS },
    layout: 'fullscreen',
  },
}

export default preview
