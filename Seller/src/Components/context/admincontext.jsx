import { createContext, useState } from "react";

export const Admincontext = createContext();

const Admincontextprovider = (props) => {
  const [atoken, setatoken] = useState(localStorage.getItem('atoken') || '');
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const value = { backendurl, atoken, setatoken };

  return (
    <Admincontext.Provider value={value}>
      {props.children}
    </Admincontext.Provider>
  );
};

export default Admincontextprovider;
