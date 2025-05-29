import React, { createContext, useState } from 'react';

export const Admincontext = createContext();

export const AdminProvider = ({ children }) => {
  const [atoken, setatoken] = useState(localStorage.getItem('atoken') || '');

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  return (
    <Admincontext.Provider value={{ backendurl, atoken, setatoken }}>
      {children}
    </Admincontext.Provider>
  );
};

export default AdminProvider;
