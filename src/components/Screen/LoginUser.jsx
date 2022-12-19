import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormLaftImg from '../../assets/FormLaftImg.svg';
import ShowP from '../../assets/ShowP.svg';
import HideIcon from '../../assets/HideIcon.svg';
import LoginIcon from '../../assets/LoginIcon.png';
import ForgotPassword from './ForgotPassword';
import API from '../../api/index';

function LoginUser() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const ForgotPasswordEvent = () => {
    setOpen(true);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoggin = async () => {
    try {
      await API('post', '/auth/login', {
        email: formState.email,
        password: formState.password,
      }).then((res) => {
        if (res?.data?.user) {
          localStorage.setItem('userData', JSON.stringify(res?.data?.user));
          localStorage.setItem('token', res?.data?.token);
          navigate('/');
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err, 'login err');
    }
  };

  return (
    <>
      <ForgotPassword open={open} setOpen={setOpen} />
      <div className="form_main">
        <div className="form_center">
          <div className="form_col">
            <img className="formLeftImg" src={FormLaftImg} alt="" />
          </div>
          <div className="form_col2">
            <div className="form_right_div">
              <div className="form_feilds">
                <p className="formTitle">Login</p>
                <p className="formP">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                <div className="input_feild">
                  <label htmlFor="b" className="input_label">
                    Email
                    <input
                      id="b"
                      type="text"
                      className="form_input"
                      placeholder="Enter your email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="input_feild">
                  <label htmlFor="c" className="input_label">
                    Password
                    <input
                      id="c"
                      type={passwordShown ? 'text' : 'password'}
                      className="form_input"
                      placeholder="Enter your password"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <div role="presentation" onClick={togglePassword} onKeyUp={togglePassword}>
                      <img
                        src={passwordShown ? ShowP : HideIcon}
                        alt="img"
                        className="hidePassword"
                      />
                    </div>
                  </label>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                      // eslint-disable-next-line
                      <p
                        className="forgot_password"
                        onClick={ForgotPasswordEvent}
                        onKeyDown={ForgotPasswordEvent}
                      >
                        Forgot Password ?
                      </p>
                    }
                  </div>
                </div>

                <div className="input_feild" style={{ display: 'flex', alignItems: 'center' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="checkmark" htmlFor="e">
                    <Checkbox defaultChecked color="secondary" id="e" />
                    &nbsp;Stay Login
                  </label>
                </div>

                <div className="input_feild">
                  <button type="button" className="form_btn" onClick={handleLoggin}>
                    Login
                    <img src={LoginIcon} alt="" className="register_icon" />
                  </button>
                  <p className="form_account_p">
                    Don’t have an account?
                    <Link to="/register">
                      <span className="form_span"> Register</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
