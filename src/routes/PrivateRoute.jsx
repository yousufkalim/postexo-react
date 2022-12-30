import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';

function PrivateRoute({ children }) {
  const isLogin = localStorage.getItem('token');
  const navigate = useNavigate();

  const validateLogin = async () => {
    axios
      .get(`${baseUrl}/auth`)
      .then(() => {})
      .catch((err) => {
        if (err?.request?.status === 403) {
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  };
  useEffect(() => {
    validateLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLogin) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
