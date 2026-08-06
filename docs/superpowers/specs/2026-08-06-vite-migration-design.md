# Migração Gatsby → Vite (modernização controlada)

**Data:** 2026-08-06  
**Status:** aprovado em conversa; aguardando review do arquivo

## Objetivo

Substituir o Gatsby 2 por Vite como bundler/dev server, atualizar a base (React 18, React Router 6, TypeScript moderno, variáveis `VITE_*`) e migrar o Storybook para Vite — sem big bang no restante do stack.

## Decisões fechadas

| Tema | Escolha |
|------|---------|
| Escopo de deps | Modernização controlada (não mínimo, não big bang) |
| CSS-in-JS | Manter Linaria com plugin Vite |
| Ferramentas no esforço | App + Storybook; Bit e Cypress fora |
| Firebase | Manter v7 (namespaced); upgrade modular depois |
| Estratégia de entrega | Cutover direto (sem dual-boot Gatsby+Vite) |
| Router | React Router 6 (não RR7 framework) |
| UI kit | Ant Design 4.x pinado (não Ant Design 5) |

## Contexto atual

O app já se comporta como SPA client-side hospedada no Gatsby:

- Admin em `/app/*` via `@reach/router` (`src/pages/app.tsx`)
- Lojas em `/:slug` via catch-all Gatsby + Reach (`OrderPage`)
- Dados e auth via Firebase no browser
- Providers em `wrapRootElement` (`Intl`, `Auth`, Ant `ConfigProvider`, Sentry)
- Env com prefixo `GATSBY_*`
- Linaria em ~15 arquivos; Tachyons + `font.css` globais
- Storybook 6 acoplado a mocks do Gatsby

O Gatsby não gera páginas a partir de CMS; o valor a preservar é o comportamento da SPA, não o pipeline de SSG.

## Arquitetura alvo

### Entrada e providers

- `index.html` → `src/main.tsx`
- Árvore de providers (equivalente ao `wrapRootElement`):

```
IntlProvider
  └─ AuthContextProvider
      └─ ConfigProvider (antd pt_BR)
          └─ Sentry.ErrorBoundary
              └─ BrowserRouter
                  └─ App (Routes)
```

- Init Firebase + Sentry e CSS globais saem de `gatsby-browser.tsx` e vão para módulos importados por `main.tsx`.
- Scripts do Here Maps (hoje em `onClientEntry`) passam a um loader em `main.tsx` ou no módulo que consome Here.

### Rotas (React Router 6)

| Path | Conteúdo |
|------|----------|
| `/` | Landing (`src/pages/index.tsx`) |
| `/app/login` | Login |
| `/app/onboard` | Onboarding |
| `/app/tenants` | Lista de negócios (outlet do admin) |
| `/app/tenants/:tenantId` | Dashboard do tenant |
| `/:slug` | Cardápio / pedidos (`OrderPage`) — **depois** das rotas `/` e `/app/*` |

Admin aninhado com `<Outlet>` no equivalente de `AdminPage` (substitui nesting do Reach).

Router central em `src/App.tsx` (árvore de `<Routes>` neste arquivo).

### Build e deploy

- `vite build` → `dist/`
- Deploy estático (Netlify/Vercel) com fallback SPA: `/*` → `/index.html`
- Emulators Firebase (`yarn emulators`) permanecem iguais

### Variáveis de ambiente

- Renomear `GATSBY_*` → `VITE_*`
- Atualizar `.env.exemplo`, `.env.development` e referências no código (`import.meta.env.VITE_...`)
- Documentar no README (EN/PT) o novo prefixo

### Remoções

- Pacotes e arquivos Gatsby (`gatsby`, plugins, `gatsby-*.ts(x|js)`, `src/gatsby/`)
- `@reach/router` e types associados
- `__mocks__/gatsby.js` e setup Storybook específico do Gatsby Link
- Scripts `gatsby develop` / `gatsby build`

## Navegação e componentes

Substituições mecânicas:

| Antes | Depois |
|-------|--------|
| `navigate` de `gatsby` / `gatsby-link` | `useNavigate` / `navigate` do `react-router-dom` |
| `RouteComponentProps` (`@reach/router`) | `useParams`, `useLocation`, props de elemento RR6 |
| `path` em componentes de página (Reach) | declaração em `<Route path=...>` |
| `useLocation` do Reach | `useLocation` do RR6 (`useAltModal` incluso) |
| `PageProps` (Gatsby) em `OrderPage` | `slug` via `useParams()` |

SEO: manter `react-helmet` (ou `react-helmet-async` se necessário para React 18). Sem SSR nesta fase — meta tags no client, alinhado ao uso atual das lojas.

Estilos: Linaria via `@wyw-in-js/vite`; Tachyons e `font.css` importados no entry.

## Tooling e dependências

### Adicionar / atualizar

- `vite`, `@vitejs/plugin-react`
- TypeScript ~5.x
- React 18 + types 18
- `react-router-dom` ^6
- Ant Design última 4.x estável + ícones compatíveis (sem `latest` no `package.json`)
- Storybook 8 + `@storybook/react-vite`
- `@wyw-in-js/vite` (ou stack Linaria oficial suportada no Vite na data da implementação)

### Manter nesta fase

- Firebase 7.x
- Jest (não migrar para Vitest)
- Cypress e Bit fora do escopo (podem ficar quebrados/ignorados)

### Scripts npm

- `dev` / `start` → `vite`
- `build` → `vite build`
- `preview` → `vite preview`
- `storybook` / `build-storybook` → Storybook Vite
- `emulators`, `test`, `lint`, `format` — manter comportamento

### Testes

- Remover mock Gatsby
- Ajustar testes que dependem de navegação para mocks de `react-router-dom`
- Não reescrever suíte além do necessário para passar

## Critério de pronto

1. `yarn dev` — landing, fluxos `/app/*` e loja `/:slug` com emulator
2. `yarn build` — `dist/` sem erro
3. Storybook sobe com as stories existentes
4. `yarn test` passa após ajustes mínimos de mock

## Fora de escopo (explícito)

- Dual-boot Gatsby + Vite
- React Router 7 framework / data APIs
- Firebase modular (v10+)
- Ant Design 5
- Vitest
- Reescrever estilos Linaria para CSS Modules
- Migrar Bit / consertar Cypress neste esforço
- SSR / pré-render de lojas

## Riscos e mitigação

| Risco | Mitigação |
|-------|-----------|
| Ordem de rotas: `/:slug` engolir `/app` | Declarar `/app/*` e `/` antes do catch-all |
| Firebase 7 + ESM no Vite | Alias/`optimizeDeps` se necessário; adiar modular |
| Linaria no Vite | Validar plugin cedo com um componente styled |
| Ant Design 4 + React 18 | Pin 4.x; checar warnings; não subir para v5 |
| Stories com LocationProvider Reach | Trocar por `MemoryRouter` / decorators RR6 |

## Ordem sugerida de implementação

1. Scaffold Vite + `index.html` + `main.tsx` + tsconfig
2. Env `VITE_*` + init Firebase/Sentry/CSS
3. Router + migração de `navigate`/props
4. Linaria no Vite; validar build de um componente
5. Remover Gatsby e limpar `package.json`
6. Storybook 8 Vite + decorators
7. Ajustar Jest; verificar critérios de pronto
8. Atualizar README (EN/PT) com setup Vite
