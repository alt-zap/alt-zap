# Migração Gatsby → Vite — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir Gatsby 2 por Vite (SPA React 18 + React Router 6), manter Firebase 7 / Ant Design 4 / Linaria, e migrar Storybook para Vite.

**Architecture:** Cutover direto: `index.html` → `src/main.tsx` → providers → `BrowserRouter` → `src/App.tsx` com rotas RR6. Remover todo o pipeline Gatsby. Env `VITE_*`. Estáticos de `static/` passam para `public/`.

**Tech Stack:** Vite 5+, `@vitejs/plugin-react`, React 18, `react-router-dom` 6, TypeScript 5, `@linaria/react` + `@wyw-in-js/vite`, Ant Design 4.24.x, Firebase 7.x, Storybook 8 (`@storybook/react-vite`), Jest.

## Global Constraints

- Firebase permanece na API namespaced **v7** (sem modular v10+).
- Ant Design permanece em **4.x** pinado (sem v5); proibido `latest` no `package.json`.
- Manter Linaria (migrar pacotes para `@linaria/*` + plugin Vite); **não** reescrever estilos para CSS Modules.
- Bit e Cypress **fora** deste esforço.
- Vitest **fora**; Jest continua.
- Sem SSR / pré-render.
- Textos e mensagens de commit em português.
- Spec de referência: `docs/superpowers/specs/2026-08-06-vite-migration-design.md`.

## Mapa de arquivos

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Shell HTML do Vite |
| `vite.config.ts` | Plugins React + Linaria, aliases se necessário |
| `src/main.tsx` | Bootstrap: CSS, Firebase, Sentry, Here, providers, render |
| `src/App.tsx` | Árvore `<Routes>` RR6 |
| `src/providers/AppProviders.tsx` | Intl + Auth + Ant Config + Sentry boundary |
| `src/lib/firebase.ts` | Init Firebase 7 + emulator em localhost |
| `src/lib/sentry.ts` | Init Sentry |
| `src/lib/loadHereMaps.ts` | Carrega scripts Here no client |
| `src/vite-env.d.ts` | Tipos `ImportMetaEnv` |
| `public/` | Conteúdo atual de `static/` |
| Templates/pages/hooks listados nas Tasks 3–4 | Troca Gatsby/Reach → RR6 |
| `.storybook/*` | Storybook 8 + Vite |
| `package.json` / `tsconfig.json` / envs / READMEs | Tooling e docs |

---

### Task 1: Scaffold Vite e dependências base

**Files:**
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `src/vite-env.d.ts`
- Create: `src/main.tsx` (stub mínimo)
- Modify: `package.json`
- Modify: `tsconfig.json`
- Create: `tsconfig.node.json`

**Interfaces:**
- Consumes: nada
- Produces: `yarn vite` / `yarn build` executáveis; `import.meta.env` tipado com as chaves `VITE_*`

- [ ] **Step 1: Atualizar `package.json` (deps e scripts)**

Remover dependências Gatsby e Reach **já nesta task** (decisão de execução: Tasks 3+4 fundidas migram todos os imports de uma vez; não há estado intermediário com Gatsby instalado):

- `gatsby`, `gatsby-plugin-*`, `@reach/router`, `@types/reach__router`

**Nota:** até a Task 3 (fundida) terminar, arquivos em `src/` ainda importam `gatsby`/`@reach/router`. Por isso o script `build` desta task usa só `vite build` (entry stub). Só após a Task 3 reativar `tsc --noEmit && vite build`.

Adicionar (versões exatas na instalação — usar ranges abaixo):

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "antd": "4.24.16",
    "@ant-design/icons": "^4.8.3",
    "firebase": "7.24.0"
  },
  "devDependencies": {
    "vite": "^5.4.11",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.6.3",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@linaria/core": "^6.2.0",
    "@linaria/react": "^6.2.1",
    "@wyw-in-js/vite": "^0.5.5"
  },
  "scripts": {
    "start": "vite",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "emulators": "firebase emulators:start --import=dev --project=alt-zap-dev",
    "firestore-export": "firebase emulators:export dev --project=alt-zap-dev",
    "lint": "eslint --ext js,jsx,ts,tsx .",
    "format": "prettier --write \"**/*.{ts,js,json}\"",
    "test": "jest",
    "storybook": "storybook dev -p 9009",
    "build-storybook": "storybook build"
  }
}
```

Manter as demais deps de produto (Sentry, react-intl, dayjs, etc.), pinando majors óbvios que hoje estão em `latest` (`react`/`react-dom`/`antd`/`moment` → versões fixas acima; `moment` pinar em `2.29.4` se ainda for usado).

Não instalar Storybook 8 ainda (Task 7). Remover `babel-preset-gatsby` dos devDependencies quando limpar.

- [ ] **Step 2: Criar `index.html` na raiz**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alt</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Criar `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wyw from '@wyw-in-js/vite'

export default defineConfig({
  plugins: [
    react(),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/analytics',
      'firebase/storage',
    ],
  },
})
```

- [ ] **Step 4: Atualizar `tsconfig.json` e criar `tsconfig.node.json`**

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "types": ["vite/client", "jest", "node"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Criar `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_KEY: string
  readonly VITE_FIREBASE_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string
  readonly VITE_HERE_APP_ID: string
  readonly VITE_HERE_KEY: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_FEEDBACK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

- [ ] **Step 6: Stub `src/main.tsx`**

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root')!)

root.render(<div>Alt Vite scaffold</div>)
```

- [ ] **Step 7: Instalar e validar scaffold**

```bash
yarn install
yarn vite --version
yarn build
```

Expected: install ok; `vite` reporta versão 5.x; `yarn build` gera `dist/` (mesmo com stub). Se Firebase/Linaria falharem no build do stub, ignorar até Tasks 2/5 — o stub não importa esses módulos ainda.

- [ ] **Step 8: Commit**

```bash
git add package.json yarn.lock index.html vite.config.ts tsconfig.json tsconfig.node.json src/vite-env.d.ts src/main.tsx
git commit -m "$(cat <<'EOF'
Adiciona scaffold Vite com React 18 e TypeScript 5.

EOF
)"
```

---

### Task 2: Env, Firebase, providers e assets estáticos

**Files:**
- Create: `src/lib/firebase.ts`
- Create: `src/lib/sentry.ts`
- Create: `src/lib/loadHereMaps.ts`
- Create: `src/providers/AppProviders.tsx`
- Modify: `src/main.tsx`
- Modify: `.env.exemplo`
- Modify: `.env.development`
- Modify: `src/components/common/useHere.ts`
- Modify: `src/components/AutoFill.tsx`
- Modify: `src/components/common/Feedback/Prompt.tsx`
- Move: `static/**` → `public/**` (conteúdo; depois remover `static/` vazio)

**Interfaces:**
- Consumes: chaves `ImportMetaEnv` da Task 1
- Produces:
  - `initFirebase(): void` em `src/lib/firebase.ts`
  - `initSentry(): void` em `src/lib/sentry.ts`
  - `loadHereMaps(): void` em `src/lib/loadHereMaps.ts`
  - `AppProviders` wrapping children

- [ ] **Step 1: Renomear envs**

`.env.exemplo`:

```env
# Firebase
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_KEY=
VITE_FIREBASE_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Here
VITE_HERE_APP_ID=
VITE_HERE_KEY=

# Sentry
VITE_SENTRY_DSN=
```

`.env.development`: trocar cada `GATSBY_` por `VITE_` mantendo os valores existentes.

- [ ] **Step 2: Criar `src/lib/firebase.ts`**

```ts
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export function initFirebase(): void {
  if (firebase.apps.length) {
    return
  }

  firebase.initializeApp(firebaseConfig)

  if (window.location.hostname === 'localhost') {
    // eslint-disable-next-line no-console
    console.log('Using Firestore on emulator')
    firebase.firestore().settings({
      host: 'localhost:4004',
      ssl: false,
    })
  }

  firebase.analytics()
}
```

- [ ] **Step 3: Criar `src/lib/sentry.ts`**

```ts
import * as Sentry from '@sentry/react'

export function initSentry(): void {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
  })
}
```

- [ ] **Step 4: Criar `src/lib/loadHereMaps.ts`**

```ts
function addScript(url: string): HTMLScriptElement {
  const script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
  return script
}

export function loadHereMaps(): void {
  const first = addScript('//js.api.here.com/v3/3.1/mapsjs-core.js')
  first.onload = () => {
    addScript('//js.api.here.com/v3/3.1/mapsjs-service.js')
  }
}
```

- [ ] **Step 5: Criar `src/providers/AppProviders.tsx`**

Baseado em `src/gatsby/wrapRoot.tsx` (sem Router — Router fica em `main`/`App`):

```tsx
import React, { FC, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import * as Sentry from '@sentry/react'

import { AuthContextProvider } from '../contexts/auth/AuthContext'
import { intlConfig } from '../intlConfig'

type Props = {
  children: ReactNode
}

export const AppProviders: FC<Props> = ({ children }) => {
  return (
    <IntlProvider
      locale={intlConfig.locale}
      defaultLocale={intlConfig.locale}
      messages={intlConfig.messages}
    >
      <AuthContextProvider>
        <ConfigProvider locale={ptBR}>
          <Sentry.ErrorBoundary fallback={null} showDialog>
            {children}
          </Sentry.ErrorBoundary>
        </ConfigProvider>
      </AuthContextProvider>
    </IntlProvider>
  )
}
```

- [ ] **Step 6: Atualizar `src/main.tsx`**

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import './font.css'
import 'tachyons/css/tachyons.min.css'

import { initFirebase } from './lib/firebase'
import { initSentry } from './lib/sentry'
import { loadHereMaps } from './lib/loadHereMaps'
import { AppProviders } from './providers/AppProviders'
import { App } from './App'

initFirebase()
initSentry()
loadHereMaps()

const root = createRoot(document.getElementById('root')!)

root.render(
  <AppProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProviders>
)
```

Nesta task, se `App` ainda não existir, criar stub em `src/App.tsx`:

```tsx
export function App() {
  return <div>App</div>
}
```

- [ ] **Step 7: Trocar `process.env.GATSBY_*` nos consumers**

Em `src/components/common/useHere.ts`, `src/components/AutoFill.tsx`, `src/components/common/Feedback/Prompt.tsx`:

- `process.env.GATSBY_HERE_APP_ID` → `import.meta.env.VITE_HERE_APP_ID`
- `process.env.GATSBY_HERE_KEY` → `import.meta.env.VITE_HERE_KEY`
- `process.env.GATSBY_FEEDBACK_URL` → `import.meta.env.VITE_FEEDBACK_URL`

- [ ] **Step 8: Mover estáticos e ajustar `.gitignore`**

O `.gitignore` atual ignora `public/` (output do Gatsby). No Vite, `public/` é fonte de estáticos e `dist/` é o build — já ignorado.

```bash
# Remover a linha `public` do .gitignore (manter /dist)
mkdir -p public
cp -R static/. public/
```

Confirmar que favicons/manifests estão em `public/` e que `public/` **não** está mais no `.gitignore`. Remover `static/` só na Task 6 (ou após confirmar serve).

- [ ] **Step 9: Validar**

```bash
yarn dev
```

Expected: página stub em http://localhost:3000; console sem crash de Firebase init (emulator pode estar off — só não deve quebrar o bootstrap).

- [ ] **Step 10: Commit**

```bash
git add src/lib src/providers src/main.tsx src/App.tsx .env.exemplo .env.development public .gitignore
git commit -m "$(cat <<'EOF'
Inicializa Firebase, Sentry e providers no entry Vite.

EOF
)"
```

Não commitar segredos novos; `.env.development` já estava no repo — apenas renomear chaves.

---

### Task 3: Router + migração completa Gatsby/Reach → React Router

> **Fundida com a antiga Task 4** (decisão de execução): todos os imports `gatsby` / `gatsby-link` / `@reach/router` saem nesta task, junto com o `App.tsx` de rotas. A antiga Task 4 foi absorvida; as Tasks 5–8 do plano original mantêm a numeração do arquivo (Task 5 Linaria, etc.).

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/index.tsx`
- Modify: `src/templates/OrderPage.tsx`
- Modify: `src/templates/AdminPage.tsx`
- Modify: `src/templates/LoginPage.tsx`
- Modify: `src/templates/OnboardPage.tsx`
- Modify: `src/templates/TenantsPage.tsx`
- Modify: `src/templates/TenantDashboardPage.tsx`
- Modify: `src/templates/UserSwitchPage.tsx`
- Modify: `src/templates/EditTenantPage.tsx`
- Modify: `src/hooks/useAltModal.ts`
- Modify: `src/hooks/useSecurePage.ts`
- Modify: `src/components/tenant/ListTenants.tsx`
- Modify: `src/components/tenant/onboard/OnboardStepper.tsx`
- Modify: `src/components/tenant/TenantDashboard.tsx`
- Create: `src/__tests__/App.routes.test.tsx`
- Modify: `jest.config.js` (se necessário para JSX/RR)
- Modify: `package.json` — restaurar `"build": "tsc --noEmit && vite build"`
- Delete: `src/pages/app.tsx`

**Interfaces:**
- Consumes: `BrowserRouter` já em `main.tsx`
- Produces: árvore RR6 completa; zero imports Gatsby/Reach em `src/`; `OrderPage`/`TenantDashboardPage` via `useParams`

- [ ] **Step 1: Escrever teste de rotas (falha antes do App completo)**

`src/__tests__/App.routes.test.tsx`:

```tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { App } from '../App'

jest.mock('../pages/index', () => ({
  __esModule: true,
  default: () => <div>Landing</div>,
}))

jest.mock('../templates/OrderPage', () => ({
  __esModule: true,
  default: () => <div>Store</div>,
}))

jest.mock('../templates/LoginPage', () => ({
  __esModule: true,
  default: () => <div>Login</div>,
}))

jest.mock('../templates/OnboardPage', () => ({
  __esModule: true,
  default: () => <div>Onboard</div>,
}))

jest.mock('../templates/AdminPage', () => ({
  __esModule: true,
  default: () => <div>Admin</div>,
}))

jest.mock('../templates/TenantsPage', () => ({
  __esModule: true,
  default: () => <div>Tenants</div>,
}))

jest.mock('../templates/TenantDashboardPage', () => ({
  __esModule: true,
  default: () => <div>Dashboard</div>,
}))

describe('App routes', () => {
  it('renderiza landing em /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Landing')).toBeTruthy()
  })

  it('não trata /app/login como slug de loja', () => {
    render(
      <MemoryRouter initialEntries={['/app/login']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.queryByText('Store')).toBeNull()
  })

  it('renderiza loja em /bardolucis', () => {
    render(
      <MemoryRouter initialEntries={['/bardolucis']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Store')).toBeTruthy()
  })
})
```

Se `@testing-library/react` não estiver instalado, adicionar como devDependency (`@testing-library/react` + `@testing-library/jest-dom`).

- [ ] **Step 2: Rodar teste — deve falhar**

```bash
yarn test src/__tests__/App.routes.test.tsx
```

Expected: FAIL (rotas/App incompletos ou mocks).

- [ ] **Step 3: Implementar `src/App.tsx`**

```tsx
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/index'
import LoginPage from './templates/LoginPage'
import OnboardPage from './templates/OnboardPage'
import AdminPage from './templates/AdminPage'
import TenantsPage from './templates/TenantsPage'
import TenantDashboardPage from './templates/TenantDashboardPage'
import OrderPage from './templates/OrderPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app/login" element={<LoginPage />} />
      <Route path="/app/onboard" element={<OnboardPage />} />
      <Route path="/app/tenants" element={<AdminPage />}>
        <Route index element={<TenantsPage />} />
        <Route path=":tenantId" element={<TenantDashboardPage />} />
      </Route>
      <Route path="/:slug" element={<OrderPage />} />
    </Routes>
  )
}
```

Ordem importa: `/app/*` e `/` **antes** de `/:slug`.

- [ ] **Step 4: Migrar `OrderPage`**

Substituir conteúdo de `src/templates/OrderPage.tsx` por:

```tsx
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import { TenantContextProvider } from '../contexts/TenantContext'
import Order from '../components/Order'
import { OrderContextProvider } from '../contexts/order/OrderContext'

const OrderPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()

  return (
    <TenantContextProvider slug={slug}>
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </TenantContextProvider>
  )
}

export default OrderPage
```

- [ ] **Step 5: Migrar landing `src/pages/index.tsx`**

- Remover imports de `gatsby` e `@reach/router`
- Remover `RouteComponentProps` do tipo do componente (`FC` sem props de rota)
- `import { useNavigate } from 'react-router-dom'`
- Trocar `navigate('/app/login')` por `const navigate = useNavigate(); navigate('/app/login')`
- Idem para `navigate('/refazenda')`

- [ ] **Step 6: Ajustar Jest para ESM/Vite paths se necessário**

Em `jest.config.js`, remover referências a Gatsby:

```js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `dist`],
  transformIgnorePatterns: [`node_modules/(?!(react-router|react-router-dom|@remix-run)/)`],
  setupFiles: [`<rootDir>/loadershim.js`],
}
```

Garantir `jest-preprocess.js` usa Babel com preset TypeScript + React (sem `babel-preset-gatsby`).

- [ ] **Step 7: Rodar teste — deve passar**

```bash
yarn test src/__tests__/App.routes.test.tsx
```

Expected: PASS nos 3 casos.

- [ ] **Step 8: Migrar AdminPage com Outlet + useNavigate**

Padrão:

```tsx
import { Outlet, useNavigate } from 'react-router-dom'

const AdminPage: FC = () => {
  const navigate = useNavigate()
  // ...
  // children → <Outlet />
  // navigate('/app/tenants'), navigate('/')
}
```

Trocar `Content>{children}</Content>` por `Content><Outlet /></Content>`.

- [ ] **Step 9: Páginas que só tinham `RouteComponentProps`**

Em `LoginPage`, `OnboardPage`, `TenantsPage`, `UserSwitchPage`, `EditTenantPage`:

- Remover `RouteComponentProps` / imports Reach/Gatsby
- Tipar como `FC`
- Onde houver `navigate(...)`, usar `useNavigate()` **dentro** de effects/handlers (nunca chamar `navigate` no corpo do render — em `UserSwitchPage` mover redirects para `useEffect`)

Exemplo `UserSwitchPage`:

```tsx
useEffect(() => {
  if (loading) return
  if (!user) {
    navigate('/app/login')
    return
  }
  if (!userDb?.hasTenant || !userDb.document) {
    navigate('/app/onboard')
    return
  }
  navigate('/app/tenants')
}, [loading, user, userDb, navigate])
```

- [ ] **Step 10: `TenantDashboardPage` com `useParams`**

```tsx
import { useParams } from 'react-router-dom'

const TenantDashboardPage: FC = () => {
  const { tenantId } = useParams<{ tenantId: string }>()
  return (
    <TenantContextProvider tenantId={tenantId}>
      <TenantDashboard />
    </TenantContextProvider>
  )
}
```

- [ ] **Step 11: Hooks**

`useAltModal.ts`:

```tsx
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useAltModal = (id: string) => {
  const location = useLocation()
  const navigate = useNavigate()

  const show = useCallback(() => {
    navigate(location.pathname, { state: { [id]: true } })
  }, [navigate, location.pathname, id])

  const close = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const modalProps = {
    onCancel: () => close(),
    visible: !!(location.state && id in (location.state as object)),
    destroyOnClose: true,
  }

  return { show, close, modalProps }
}
```

`useSecurePage.ts`: trocar `gatsby-link` por `useNavigate`.

- [ ] **Step 12: Componentes com `navigate` de gatsby/gatsby-link**

Arquivos:

- `src/components/tenant/ListTenants.tsx`
- `src/components/tenant/onboard/OnboardStepper.tsx`
- `src/components/tenant/TenantDashboard.tsx`

Usar `const navigate = useNavigate()` e as mesmas URLs.

- [ ] **Step 13: Remover `src/pages/app.tsx` e restaurar build com tsc**

Rotas já declaradas em `App.tsx`. Em `package.json`:

```json
"build": "tsc --noEmit && vite build"
```

Confirmar zero hits:

```bash
rg -n "from ['\"]gatsby|from ['\"]gatsby-link|from ['\"]@reach/router" src
```

Expected: sem matches.

- [ ] **Step 14: Validar**

```bash
yarn test src/__tests__/App.routes.test.tsx
yarn build
yarn emulators
# outro terminal
yarn dev
```

Checklist manual: `/` → login → (com emulator) `/app/tenants` → `/app/tenants/:id` → `/bardolucis`.

- [ ] **Step 15: Commit**

```bash
git add src jest.config.js package.json yarn.lock
git commit -m "$(cat <<'EOF'
Migra rotas e navegação de Gatsby/Reach para React Router.

EOF
)"
```

---

### Task 4: _(absorvida na Task 3)_

Não executar. Conteúdo fundido na Task 3 por decisão de execução (opção B).

---

### Task 5: Linaria (`@linaria/*`) nos componentes

**Files:**
- Modify: todos os arquivos com `from 'linaria/react'` (lista abaixo)
- Modify: `package.json` (remover pacote legado `linaria` se ainda existir)
- Verify: `vite.config.ts` já tem `@wyw-in-js/vite` (Task 1)

**Lista de imports a trocar** (`linaria/react` → `@linaria/react`):

- `src/components/common/Feedback/Option.tsx`
- `src/components/common/Feedback/index.tsx`
- `src/components/common/Feedback/Button.tsx`
- `src/components/common/Feedback/Prompt.tsx`
- `src/components/common/DocsSuggestion.tsx`
- `src/components/order/TenantHeader.tsx`
- `src/components/order/OrderItem.tsx`
- `src/components/order/OrderItemFooter.tsx`
- `src/components/order/ProductDescription.tsx`
- `src/components/order/AddButton.tsx`
- `src/components/tenant/sites/cms/sort/SortCategories.tsx`
- `src/components/tenant/TenantDashboard.tsx`
- `src/components/Totalizer.tsx`
- `src/components/site/Header.tsx`

**Interfaces:**
- Consumes: plugin WyW da Task 1
- Produces: estilos Linaria compilando no `yarn build`

- [ ] **Step 1: Replace em massa dos imports**

```bash
rg -l "from 'linaria/react'" src | xargs sed -i '' "s/from 'linaria\/react'/from '@linaria\/react'/g"
```

(No Linux sem BSD sed, ajustar flag `-i`.)

- [ ] **Step 2: Remover pacote legado `linaria` do `package.json` e `yarn install`**

- [ ] **Step 3: Build de verificação**

```bash
yarn build
```

Expected: sucesso; CSS Linaria emitido. Se falhar em um arquivo styled, corrigir só esse arquivo (API `styled` do `@linaria/react` é compatível na maioria dos casos).

- [ ] **Step 4: Commit**

```bash
git add src package.json yarn.lock
git commit -m "$(cat <<'EOF'
Migra Linaria para @linaria/react com plugin Vite.

EOF
)"
```

---

### Task 6: Remover Gatsby e configurar SPA fallback

**Files:**
- Delete: `gatsby-browser.tsx`, `gatsby-ssr.tsx`, `gatsby-node.ts`, `gatsby-config.js`
- Delete: `src/gatsby/**`
- Delete: `__mocks__/gatsby.js`
- Delete: `static/` (após `public/` populado)
- Create: `public/_redirects` (Netlify)
- Create: `vercel.json` **somente se** o deploy atual for Vercel; caso contrário só `_redirects`
- Modify: `package.json` (garantir zero deps `gatsby*`)
- Modify: `.gitignore` — adicionar `dist/`, remover `.cache` do Gatsby se quiser manter histórico ignore

**Interfaces:**
- Consumes: app já independente do Gatsby
- Produces: repo sem artifacts Gatsby; deep links SPA funcionam no host estático

- [ ] **Step 1: Apagar arquivos Gatsby listados**

- [ ] **Step 2: `public/_redirects`**

```
/*    /index.html   200
```

- [ ] **Step 3: Grep de resíduos**

```bash
rg -n "gatsby|@reach/router|GATSBY_" --glob '!docs/**' --glob '!node_modules/**'
```

Expected: zero hits em código/config de app (docs do spec/plan podem citar Gatsby).

- [ ] **Step 4: `yarn build && yarn preview`**

Abrir rota `/bardolucis` via preview — deve servir o SPA.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Remove Gatsby e configura fallback SPA.

EOF
)"
```

---

### Task 7: Storybook 8 + Vite

**Files:**
- Replace: `.storybook/main.js` → `.storybook/main.ts`
- Modify: `.storybook/preview.ts`
- Delete: `.storybook/webpack.config.js`, `.storybook/babel.config.js` (se obsoletos)
- Modify: `src/components/stories/TenantDashboard.stories.tsx` (e qualquer story com Reach)
- Modify: `package.json` scripts/deps Storybook

**Interfaces:**
- Consumes: mesmos providers/CSS do app quando possível
- Produces: `yarn storybook` sobe em `:9009`

- [ ] **Step 1: Instalar Storybook 8 Vite**

```bash
yarn add -D storybook@^8.4.0 @storybook/react@^8.4.0 @storybook/react-vite@^8.4.0 @storybook/addon-essentials@^8.4.0 @storybook/addon-viewport@^8.4.0
```

Remover `@storybook/addon-knobs` (deprecated) — stories que usam knobs: converter para `args`/`controls` **mínimo** para não quebrar o boot (ou deixar knobs de fora e pular stories quebradas só se inevitável; preferir converter as que falham no boot).

- [ ] **Step 2: `.storybook/main.ts`**

```ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/components/stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-viewport'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
```

- [ ] **Step 3: `.storybook/preview.ts`**

Remover hacks `___loader` / `__BASE_PATH__` / `___navigate`. Manter CSS:

```ts
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
```

- [ ] **Step 4: Stories com Reach**

`TenantDashboard.stories.tsx`: trocar `LocationProvider` / `RouteComponentProps` por `MemoryRouter` do `react-router-dom`.

- [ ] **Step 5: Validar**

```bash
yarn storybook
```

Expected: UI sobe; pelo menos as stories sem knobs renderizam. Corrigir erros de import até o boot ficar limpo.

- [ ] **Step 6: Commit**

```bash
git add .storybook src/components/stories package.json yarn.lock
git commit -m "$(cat <<'EOF'
Migra Storybook 8 para o builder Vite.

EOF
)"
```

---

### Task 8: Jest final, READMEs e critério de pronto

**Files:**
- Modify: `jest.config.js`, `jest-preprocess.js`, `loadershim.js` (se ainda referenciar Gatsby)
- Delete: resíduos de mock Gatsby
- Modify: `README.md`, `README_PT.md` (setup Vite, `VITE_*`, scripts)
- Run: suíte completa + build

**Interfaces:**
- Consumes: app + Storybook migrados
- Produces: critérios de pronto do spec satisfeitos

- [ ] **Step 1: Limpar Jest de Gatsby**

- Remover `globals.__PATH_PREFIX__` se não for mais necessário
- Remover `transformIgnorePatterns` de `gatsby`
- Garantir testes existentes em `src/__tests__/orderItem.test.ts` ainda passam

```bash
yarn test
```

Expected: PASS.

- [ ] **Step 2: Atualizar READMEs**

Substituir instruções `gatsby develop` / emulador + `yarn start` para:

1. `yarn`
2. `yarn emulators`
3. `yarn dev` (ou `yarn start`)
4. Login Google / Bar do Lucis / `http://localhost:3000/bardolucis`
5. Documentar variáveis `VITE_*` apontando para `.env.exemplo`

Manter paridade EN (`README.md`) e PT (`README_PT.md`).

- [ ] **Step 3: Checklist de pronto (spec)**

```bash
yarn dev          # landing, /app/*, /:slug com emulator
yarn build        # dist/ ok
yarn storybook    # sobe
yarn test         # passa
```

- [ ] **Step 4: Commit final**

```bash
git add README.md README_PT.md jest.config.js jest-preprocess.js
git commit -m "$(cat <<'EOF'
Atualiza docs e testes após a migração para Vite.

EOF
)"
```

---

## Self-review do plano (vs spec)

| Requisito do spec | Task |
|-------------------|------|
| Scaffold Vite + main + tsconfig | 1 |
| Env `VITE_*` + Firebase/Sentry/CSS/Here | 2 |
| Router + migrate navigate/props | 3–4 |
| Linaria no Vite | 1 (plugin) + 5 (imports) |
| Remover Gatsby | 6 |
| Storybook 8 Vite | 7 |
| Jest + README + critérios de pronto | 8 |
| Firebase 7 / Ant 4 / sem Vitest/Bit/Cypress | Global Constraints |
| SPA fallback | 6 (`_redirects`) |
| Ordem `/:slug` depois de `/app` | 3 (`App.tsx` + teste) |

Placeholders: nenhum TBD. `UserSwitchPage` / `EditTenantPage` migrados na Task 4 mesmo sem rota ativa, para zerar imports Reach/Gatsby.
