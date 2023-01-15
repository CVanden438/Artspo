import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './firebase/auth'
import { ArtProvider } from './firebase/db'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ArtProvider>
        <App />
      </ArtProvider>
    </AuthProvider>
  </React.StrictMode>
)
