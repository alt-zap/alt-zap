import React from "react"
import ReactDOM from "react-dom"
import * as firebase from "firebase"
// import "firebase/analytics"

import { Router } from "@reach/router"

import "antd/dist/antd.css"
import "./index.css"

import HomePage from "./pages/HomePage"
import PedidoPage from "./pages/PedidoPage"
import EditTenantPage from "./pages/EditTenantPage"
import LoginPage from "./pages/LoginPage"
import OnboardPage from "./pages/OnboardPage"

import { AuthContextProvider } from "./contexts/AuthContext"
import UserSwitch from "./components/UserSwitch"

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID
} = process.env

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: `${REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  // firebase.analytics()
}

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <UserSwitch path="/" />
        <LoginPage path="/login" />
        <OnboardPage path="/onboard" />
        <EditTenantPage path="/edit-tenant" />
        <PedidoPage path="/:slug" />
      </Router>
    </AuthContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
