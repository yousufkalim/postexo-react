import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import FormLaftImg from '../../assets/FormLaftImg.svg';
import ShowP from '../../assets/ShowP.svg';
import HideIcon from '../../assets/HideIcon.svg';
import LoginIcon from '../../assets/LoginIcon.png';
import ForgotPassword from './ForgotPassword';
import API from '../../api/index';
import { handleBlur } from '../../utils/form';
import ErrorField from '../../common/ErrorField';

function LoginUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
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

  const blurHandler = (e) => {
    handleBlur(e, errors, setErrors);
  };

  const disableBtn = !(formState.email && formState.password);

  const handleLoggin = async () => {
    try {
      await API('post', '/auth/login', {
        email: formState.email,
        password: formState.password,
      }).then((res) => {
        if (res?.data?.user) {
          // toast.success('Login successfully');
          setTimeout(() => {
            localStorage.setItem('userData', JSON.stringify(res?.data?.user));
            localStorage.setItem('token', res?.data?.token);
            navigate('/sessions');
          }, 200);
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
                <p className="formTitle">{t('Login')}</p>
                <p className="formP">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                <div className="input_feild">
                  <label htmlFor="b" className="input_label">
                    {t('Email')}
                    <input
                      id="b"
                      type="text"
                      className="form_input"
                      placeholder={t('Enter your email')}
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={blurHandler}
                    />
                  </label>
                  {errors.email && <ErrorField error={errors.email} />}
                </div>
                <div className="input_feild">
                  <label htmlFor="c" className="input_label">
                    {t('Password')}
                    <input
                      id="c"
                      type={passwordShown ? 'text' : 'password'}
                      className="form_input"
                      placeholder={t('Enter your password')}
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      onBlur={blurHandler}
                    />
                    <div role="presentation" onClick={togglePassword} onKeyUp={togglePassword}>
                      <img
                        src={passwordShown ? ShowP : HideIcon}
                        alt="img"
                        className="hidePassword"
                      />
                    </div>
                  </label>
                  {errors.password && <ErrorField error={errors.password} />}

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                      // eslint-disable-next-line
                      <p
                        className="forgot_password"
                        onClick={ForgotPasswordEvent}
                        onKeyDown={ForgotPasswordEvent}
                      >
                        {t('Forgot Password ?')}
                      </p>
                    }
                  </div>
                </div>

                <div className="input_feild" style={{ display: 'flex', alignItems: 'center' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="checkmark" htmlFor="e">
                    <Checkbox defaultChecked color="secondary" id="e" />
                    &nbsp;{t('Stay Login')}
                  </label>
                </div>

                <div className="input_feild">
                  <button
                    disabled={disableBtn}
                    type="button"
                    className="form_btn"
                    onClick={handleLoggin}
                  >
                    {t('Login')}
                    <img src={LoginIcon} alt="" className="register_icon" />
                  </button>
                  <p className="form_account_p">
                    {t('Don’t have an account?')}
                    <Link to="/register">
                      <span className="form_span"> {t('Register')}</span>
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
