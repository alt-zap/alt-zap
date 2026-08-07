<p align="center">
  <a href="https://alt.app.br">
    <img alt="Alt" src="https://avatars1.githubusercontent.com/u/68825062?s=200&v=4" width="60" />
  </a>
</p>
<h1 align="center">
  Alt
</h1>
<h5 align="center">An app for small businesses to share their products and sell online</h5>

<p align="center">English · <a href="./README_PT.md">Português</a></p>

Small business owners can use **Alt** to list their products and:

- Get an **online page** with their product catalog.
- Receive orders **via WhatsApp.**
- Configure **delivery methods** and **payment options**
- Do all of this **with no fees**.

**Upcoming features:**
- [Physical Store Mode](https://github.com/alt-zap/alt-zap/issues/31) to display the catalog (and receive orders) for **in-person customers**.
- [Dynamic Delivery Fee](https://github.com/alt-zap/alt-zap/issues/52) for a fair delivery fee calculation.
- **Communities**: for local groups to share their products.

## Table of Contents
- [Example](#example)
- [Pricing](#pricing)
- [Development](#development)
  * [Requirements](#requirements)
  * [Environment variables](#environment-variables)
  * [Getting started](#getting-started)
  * [Disclaimers](#disclaimers)
- [Contributors](#contributors)

## Example

Visit [Refazenda](https://refazenda.alt.app.br), our sample store, and explore all the features available on the platform.

<p align="center"><img src="https://user-images.githubusercontent.com/18706156/95028569-5ca31a80-0677-11eb-86a8-36041af25369.png" width="420" /></p>

## Pricing

Alt's services are **entirely free**, and we intend to keep it that way forever. We currently rely on services such as Firebase and Vercel to offer these features at no cost.

In the future, we plan to **ship a _self-hosted_ version**, so users can run it (for free) on their own accounts (Firebase and Vercel/Netlify).

The main motivation behind this project is to **help local communities**, and we count on the generous contributions of designers and developers.

## Development

This project is a **Vite** SPA. It renders **Alt Admin**, the administration dashboard where customers configure the available features, and also **Alt Menu**, the part of the system that renders each business's pages.

### Learn

Here is a series of *Alt Talks* introducing the Alt application from a more technical angle and explaining some of the system modules:

- [**#001 - Running the project for the first time**](https://youtu.be/ydUFnv17sXY)
- [**#002 - Authentication Module**](https://youtu.be/oW2VlA-SnBQ)
- [**#003 - Opening Hours**](https://youtu.be/5WDdAMNb1fY)
- [**#004 - Assembly Options**](https://youtu.be/xqLUQm44Do8)
- [**#005 - Order Module**](https://youtu.be/rIWBrQSNByY)
- [**#006 - Internationalization**](https://youtu.be/Il1H1h5xeVg)

### Requirements
- We use [Firebase](https://firebase.google.com) as the authentication and database provider. For local development, you can use the **Firebase Emulator**, distributed by Firebase itself. If you prefer to create your own Firebase project, you can also use it by configuring the environment variables as shown in `.env.exemplo`.

- To set up the Firebase Emulator, follow [these steps](https://firebase.google.com/docs/rules/emulator-setup). **This step can take a while, but you only need to do it once**. The Firebase CLI will download the emulators (written in Java) and, eventually, the JDK. That lets you run a local version of Firebase's Firestore database.

### Environment variables

Copy `.env.exemplo` to `.env.development` (or `.env.local`) and fill in the values you need. Vite exposes only variables prefixed with `VITE_`:

| Variable | Purpose |
|----------|---------|
| `VITE_FIREBASE_*` | Firebase web app config |
| `VITE_HERE_*` | Here Maps (optional locally) |
| `VITE_SENTRY_DSN` | Sentry (optional locally) |

With the Firebase emulator running, the app is configured for local development without a production Firebase project.

### Getting started
1. Clone the project with `git clone git@github.com:alt-zap/alt-zap.git`.
2. Run `yarn` at the project root to **install dependencies**.
3. Run `yarn emulators` to **start the Firebase emulator**.
4. In another terminal tab, run `yarn dev` (alias: `yarn start`) to **start the Vite dev server** on http://localhost:3000.
5. On the home page, **sign in with your Google account**. Complete your Alt registration.
6. After that, you **do not need to create a new business** through the Onboarding flow. Right after filling in your details, if you are on `localhost`, you will be redirected to the "Bar do Lucis" dashboard. On later logins, you may need to click the **My Businesses** link in the Menu to reach the Admin panel.
7. To view this Tenant's menu, open http://localhost:3000/bardolucis.

> Make sure you access the service using the **localhost** host.

**Other scripts:** `yarn build` produces `dist/` (Vite bundle). Run `yarn typecheck` for a full TypeScript check (legacy strict issues may still be reported). `yarn test` runs Jest; `yarn storybook` starts Storybook on port 9009.

### Disclaimers
- We already seed some **initial data** so you do not need to configure anything. You can inspect it in the Firebase Emulator UI (usually at http://localhost:4000).
- The location service currently uses the [Here SDK](https://developer.here.com/), which requires **API keys**. You can create an account and configure your environment if you want, but it is not required.
- To make local development easier, there are **conditions in the code** that load mock data. For example, we would normally load `tenants` for the logged-in user's `userId`, but on `localhost` we always resolve to the same id (mine).

Feel free to report bugs, ask questions, and share suggestions in the repository issues.

## Contributors

[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/0)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/0)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/1)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/1)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/2)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/2)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/3)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/3)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/4)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/4)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/5)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/5)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/6)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/6)[![](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/images/7)](https://sourcerer.io/fame/pedroespindula/lucis/alt-zap/links/7)
