import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormLaftImg from '../../assets/FormLaftImg.svg';
import ShowP from '../../assets/ShowP.svg';
import HideIcon from '../../assets/HideIcon.svg';
import RegisterIcon from '../../assets/RegisterIcon.svg';
import API from '../../api/index';

function SignUp() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
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

  const handleSubmit = async () => {
    await API('post', '/users/', {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    })
      .then(() => {
        toast.success('User registered successfully');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
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
                  <input
                    id="a"
                    type="text"
                    className="form_input"
                    placeholder="Enter your name"
                    value={formState.name}
                    name="name"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="input_feild">
                <label htmlFor="b" className="input_label">
                  Email
                  <input
                    id="b"
                    type="text"
                    className="form_input"
                    placeholder="Enter your email"
                    value={formState.email}
                    name="email"
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
                    value={formState.password}
                    name="password"
                    onChange={handleChange}
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
                <button type="button" className="form_btn" onClick={handleSubmit}>
                  Register
                  <img src={RegisterIcon} alt="" className="register_icon" />
                </button>
                <p className="form_account_p">
                  You have an account?
                  <Link to="/login">
                    <span className="form_span"> Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
