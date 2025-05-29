import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Admincontext } from '../Components/context/admincontext';

const ProtectedRoute = ({ children }) => {
  const { atoken } = useContext(Admincontext);

  if (!atoken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
