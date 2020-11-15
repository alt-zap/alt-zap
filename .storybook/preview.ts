import { configure } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import 'antd/dist/antd.css'
import './styles.css'
import 'tachyons/css/tachyons.min.css'

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
// @ts-ignore
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable is prevents the "__BASE_PATH__ is not defined" error inside Storybook.
// @ts-ignore
global.__BASE_PATH__ = ''
// @ts-ignore
global.__PATH_PREFIX__ = ''
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
// @ts-ignore
window.___navigate = (pathname) => {
  console.log(`Navigating to ${pathname}`)
}

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  layout: 'fullscreen',
}

configure(
  [require.context('../src/components/stories', true, /\.stories\.tsx$/)],
  module
)
