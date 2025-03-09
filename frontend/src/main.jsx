import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="679581367699-66o5c2qal7hebctt339eiatt1gqhmk26.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
