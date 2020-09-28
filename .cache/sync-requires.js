const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/.cache/dev-404-page.js"))),
  "component---src-pages-edit-tenant-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/EditTenantPage.tsx"))),
  "component---src-pages-login-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/LoginPage.tsx"))),
  "component---src-pages-onboard-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/OnboardPage.tsx"))),
  "component---src-pages-order-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/OrderPage.tsx"))),
  "component---src-pages-tenant-dashboard-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/TenantDashboardPage.tsx"))),
  "component---src-pages-tenants-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/TenantsPage.tsx"))),
  "component---src-pages-user-switch-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/pages/UserSwitchPage.tsx"))),
  "component---src-templates-order-page-tsx": hot(preferDefault(require("/Users/lucis/computacao/alt/alt-zap/src/templates/OrderPage.tsx")))
}

