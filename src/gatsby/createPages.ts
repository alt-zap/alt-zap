// eslint-disable-next-line import/no-nodejs-modules
import { resolve } from 'path'

import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/__tenant_slug__',
    matchPath: '/*',
    component: resolve(__dirname, '../templates/OrderPage.tsx'),
    context: {},
  })

  createPage({
    path: '/indoor/__tenant_id__',
    matchPath: '/indoor/*',
    component: resolve(__dirname, '../templates/IndoorPage.tsx'),
    context: {},
  })

  createPage({
    path: '/order-placed',
    component: resolve(__dirname, '../templates/OrderPlacedPage.tsx'),
    context: {},
  })
}
