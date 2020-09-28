const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/.cache/dev-404-page.js"))),
  "component---src-pages-app-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/app.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/index.tsx"))),
  "component---src-templates-order-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/templates/OrderPage.tsx")))
}

