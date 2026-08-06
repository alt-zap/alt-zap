import * as Sentry from '@sentry/react'

export function initSentry(): void {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
  })
}
