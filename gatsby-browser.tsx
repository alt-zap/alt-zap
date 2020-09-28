import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

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
    firebase.firestore().settings({
      host: 'localhost:4004',
      ssl: false,
    })
  }

  firebase.analytics()
}

export { wrapRootElement } from './src/gatsby/wrapRoot'
