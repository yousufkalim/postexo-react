import React from 'react';
import RegisterNavbar from '../components/Screen/RegisterNavbar';
import LoginUser from '../components/Screen/LoginUser';
import FormBg from '../assets/FormBg.svg';

function Login() {
  return (
    <div className="form_container">
      <img src={FormBg} alt="" className="formRightImg" />
      <RegisterNavbar />
      <LoginUser />
    </div>
  );
}

export default Login;
