import React from "react"
import ReactDOM from "react-dom"
import * as firebase from "firebase"
import { Router, Link } from "@reach/router"

import "antd/dist/antd.css"
import "./index.css"

import HomePage from "./pages/HomePage"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCzMTycLwjA7AqcXmaBLIw3AvlwCGcgqN8",
  authDomain: "alt-zap.firebaseapp.com",
  databaseURL: "https://alt-zap.firebaseio.com",
  projectId: "alt-zap",
  storageBucket: "alt-zap.appspot.com",
  messagingSenderId: "1714467047",
  appId: "1:1714467047:web:19299006d2dc09c730b242",
  measurementId: "G-WQCGKC63FY"
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

const App = () => {
  return (
    <Router>
      <HomePage path="/:slug" />
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
