import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from './Context/AuthContext.jsx'
import { ContactConetextProvider } from './Context/ContactConetext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  <AuthContextProvider>
    <ContactConetextProvider>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContactConetextProvider>
  </AuthContextProvider>
  </React.StrictMode>
  ,
)
