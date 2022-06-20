import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { Provider } from 'react-redux'
import store from './store'

import 'antd/dist/antd.min.css'
import '@/assets/styles/global.scss'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
