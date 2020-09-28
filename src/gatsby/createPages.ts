import { resolve } from 'path'
import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/__tenant_slug__',
    matchPath: '/:*',
    component: resolve(__dirname, '../templates/OrderPage.tsx'),
    context: {},
  })
}
