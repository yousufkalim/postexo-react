import React from 'react';
import RegisterNavbar from '../components/Screen/RegisterNavbar';
// import InputField from '../common/InputField';
import SignUp from '../components/Screen/SignUp';
import FormBg from '../assets/FormBg.svg';

function Register() {
  return (
    <div className="form_container">
      <img src={FormBg} alt="" className="formRightImg" />
      <RegisterNavbar />
      <SignUp />
    </div>
  );
}

export default Register;
