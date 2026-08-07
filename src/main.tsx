import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import './font.css'
import 'tachyons/css/tachyons.min.css'

import { initFirebase } from './lib/firebase'
import { initSentry } from './lib/sentry'
import { loadHereMaps } from './lib/loadHereMaps'
import { AppProviders } from './providers/AppProviders'
import { App } from './App'

initFirebase()
initSentry()
loadHereMaps()

const root = createRoot(document.getElementById('root')!)

root.render(
  <AppProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProviders>
)
