import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminProvider } from './Components/context/admincontext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);
