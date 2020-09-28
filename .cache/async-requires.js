// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./../../dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-app-tsx": () => import("./../../../src/pages/app.tsx" /* webpackChunkName: "component---src-pages-app-tsx" */),
  "component---src-pages-index-tsx": () => import("./../../../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-templates-order-page-tsx": () => import("./../../../src/templates/OrderPage.tsx" /* webpackChunkName: "component---src-templates-order-page-tsx" */)
}

