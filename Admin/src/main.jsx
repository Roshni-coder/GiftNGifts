import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Admincontextprovider from './Components/context/admincontext.jsx'

createRoot(document.getElementById('root')).render(
 
  <Admincontextprovider>
  <App />
  </Admincontextprovider>

  

)
