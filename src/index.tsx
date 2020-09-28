import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/analytics'
import { Router, globalHistory } from '@reach/router'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { QueryParamProvider } from 'use-query-params'
import { IntlProvider } from 'react-intl'
import * as Sentry from '@sentry/react'

import 'antd/dist/antd.css'
import './font.css'
import 'tachyons/css/tachyons.min.css'

import PedidoPage from './pages/OrderPage'
import LegacyEditTenantPage from './pages/EditTenantPage'
import LoginPage from './pages/LoginPage'
import OnboardPage from './pages/OnboardPage'
import TenantsPage from './pages/TenantsPage'
import { AuthContextProvider } from './contexts/auth/AuthContext'
import UserSwitch from './pages/UserSwitchPage'
import AdminPage from './templates/AdminPage'
import TenantDashboardPage from './pages/TenantDashboardPage'
import { intlConfig } from './intlConfig'

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: `${REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)

  if (window?.location.hostname === 'localhost') {
    firebase.firestore().settings({
      host: 'localhost:4004',
      ssl: false,
    })
  }

  firebase.analytics()
}

const App = () => {
  return (
    <AuthContextProvider>
      <Sentry.ErrorBoundary fallback={null} showDialog>
        <IntlProvider
          locale={intlConfig.locale}
          defaultLocale={intlConfig.locale}
          messages={intlConfig.messages}
        >
          <ConfigProvider locale={ptBR}>
            <Router>
              <QueryParamProvider
                {...{ path: '/' }}
                reachHistory={globalHistory}
              >
                <UserSwitch path="/" />
                <LoginPage path="/login" />
                <OnboardPage path="/onboard" />
                <AdminPage path="/tenants">
                  <TenantDashboardPage path="/:tenantId" />
                  <TenantsPage path="/" />
                </AdminPage>
                <LegacyEditTenantPage path="/tenants-legacy/:tenantId" />
                <PedidoPage path="/:slug" />
              </QueryParamProvider>
            </Router>
          </ConfigProvider>
        </IntlProvider>
      </Sentry.ErrorBoundary>
    </AuthContextProvider>
  )
}

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
})

ReactDOM.render(<App />, document.getElementById('root'))
