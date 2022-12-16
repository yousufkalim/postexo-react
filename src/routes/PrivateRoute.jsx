import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isLogin = localStorage.getItem('token');
  if (isLogin) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
