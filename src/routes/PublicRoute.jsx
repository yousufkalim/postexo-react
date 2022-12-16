import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const isLogin = localStorage.getItem('token');

  if (isLogin) {
    return <Navigate to="/home" />;
  }
  return children;
}

export default PublicRoute;
