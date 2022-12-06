import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormLaftImg from '../../assets/FormLaftImg.svg';
import ShowP from '../../assets/ShowP.svg';
import HideIcon from '../../assets/HideIcon.svg';
import RegisterIcon from '../../assets/RegisterIcon.svg';

function SignUp() {
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
              <p className="formTitle">Register</p>
              <p className="formP">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
              <div className="Input_feild">
                <label htmlFor="a" className="input_label">
                  Name
                  <input id="a" type="text" className="form_input" placeholder="Enter your name" />
                </label>
              </div>
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
                  {/* eslint-disable-next-line  */}
                  <img
                    onClick={togglePassword}
                    src={passwordShown ? ShowP : HideIcon}
                    alt=""
                    className="hidePassword"
                  />
                </label>
              </div>
              <div className="input_feild">
                <button type="button" className="form_btn">
                  Register
                  <img src={RegisterIcon} alt="" className="register_icon" />
                </button>
                <Link to="/login">
                  <p className="form_account_p">
                    You have an account? <span className="form_span">Login</span>
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

export default SignUp;
