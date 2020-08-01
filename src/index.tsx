import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/analytics'
import { Router } from '@reach/router'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'

import 'antd/dist/antd.css'
import './font.css'

import PedidoPage from './pages/OrderPage'
import LegacyEditTenantPage from './pages/EditTenantPage'
import LoginPage from './pages/LoginPage'
import OnboardPage from './pages/OnboardPage'
import TenantsPage from './pages/TenantsPage'
import { AuthContextProvider } from './contexts/AuthContext'
import UserSwitch from './pages/UserSwitchPage'
import AdminPage from './templates/AdminPage'
import TenantDashboardPage from './pages/TenantDashboardPage'

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
      <ConfigProvider locale={ptBR}>
        <Router>
          <UserSwitch path="/" />
          <LoginPage path="/login" />
          <OnboardPage path="/onboard" />
          <AdminPage path="/tenants">
            <TenantDashboardPage path="/:tenantId" />
            <TenantsPage path="/" />
          </AdminPage>
          <LegacyEditTenantPage path="/tenants-legacy/:tenantId" />
          <PedidoPage path="/:slug" />
        </Router>
      </ConfigProvider>
    </AuthContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
