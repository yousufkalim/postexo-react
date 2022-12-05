import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormLaftImg from '../../assets/FormLaftImg.svg';
import ShowP from '../../assets/ShowP.svg';
import HideIcon from '../../assets/HideIcon.svg';
import LoginIcon from '../../assets/LoginIcon.png';

function LoginUser() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
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
                  <input id="b" type="text" className="form_input" placeholder="Enter your email" />
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
                  />
                  <div role="presentation" onClick={togglePassword} onKeyUp={togglePassword}>
                    <img
                      src={passwordShown ? ShowP : HideIcon}
                      alt="img"
                      className="hidePassword"
                    />
                  </div>
                </label>
                <p className="forgot_password">Forgot Password ?</p>
              </div>

              <div className="input_feild" style={{ display: 'flex' }}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="checkmark" htmlFor="e">
                  <Checkbox defaultChecked color="secondary" id="e" />
                  Stay Login
                </label>
              </div>

              <div className="input_feild">
                <button type="button" className="form_btn">
                  Login
                  <img src={LoginIcon} alt="" className="register_icon" />
                </button>
                <Link to="/register">
                  <p className="form_account_p">
                    Don’t have an account? <span className="form_span">Register</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
