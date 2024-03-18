import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

window.electron.ipcRenderer.invoke('app-meta', []).then((meta) => {
  window.app = { webviewPreloadPath: meta.webviewPreloadPath }
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
