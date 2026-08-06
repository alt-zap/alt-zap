// / <reference types="vite/client" />

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
