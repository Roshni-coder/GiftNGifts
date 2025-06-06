
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admincontextprovider from './Components/context/admincontext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
 
  <Admincontextprovider>
    <ToastContainer/>
  <App />
  </Admincontextprovider>

)
