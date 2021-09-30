import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import * as Sentry from '@sentry/react'

import './src/font.css'
import 'tachyons/css/tachyons.min.css'

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_KEY,
  authDomain: `${process.env.GATSBY_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.GATSBY_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.GATSBY_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.GATSBY_FIREBASE_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)

  if (window?.location.hostname === 'localhost') {
    // eslint-disable-next-line no-console
    console.log('Using Firestore on emulator')
    firebase.firestore().settings({
      experimentalForceLongPolling: true,
      host: 'localhost:4004',
      ssl: false,
    })
  }

  firebase.analytics()
}

Sentry.init({
  dsn: process.env.GATSBY_SENTRY_DSN,
})

export { wrapRootElement } from './src/gatsby/wrapRoot'

const addScript = (url: string) => {
  const script = document.createElement('script')

  script.src = url
  document.body.appendChild(script)

  return script
}

export const onClientEntry = () => {
  window.onload = () => {
    const first = addScript('//js.api.here.com/v3/3.1/mapsjs-core.js')

    first.onload = () => {
      addScript('//js.api.here.com/v3/3.1/mapsjs-service.js')
    }
  }
}
