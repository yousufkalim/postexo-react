import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import FormLaftImg from '../../assets/FormLaftImg.svg';
import ShowP from '../../assets/ShowP.svg';
import HideIcon from '../../assets/HideIcon.svg';
import RegisterIcon from '../../assets/RegisterIcon.svg';
import API from '../../api/index';
import ErrorField from '../../common/ErrorField';
import { handleBlur } from '../../utils/form';

function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
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

  const blurHandler = (e) => {
    handleBlur(e, errors, setErrors);
  };

  const handleSubmit = async () => {
    await API('post', '/users/', {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    })
      .then(() => {
        toast.success(t('User registered successfully'));
        setTimeout(() => {
          navigate('/login');
        }, 200);
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
              <p className="formTitle">{t('Register')}</p>
              <p className="formP">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
              <div className="Input_feild">
                <label htmlFor="a" className="input_label">
                  {t('Name')}
                  <input
                    id="a"
                    type="text"
                    className="form_input"
                    placeholder={t('Enter your name')}
                    value={formState.name}
                    name="name"
                    onBlur={blurHandler}
                    onChange={handleChange}
                  />
                </label>
                {errors.name && <ErrorField error={errors.name} />}
              </div>
              <div className="input_feild">
                <label htmlFor="b" className="input_label">
                  {t('Email')}
                  <input
                    id="b"
                    type="text"
                    className="form_input"
                    placeholder={t('Enter your email')}
                    value={formState.email}
                    name="email"
                    onBlur={blurHandler}
                    onChange={handleChange}
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
                    value={formState.password}
                    name="password"
                    onBlur={blurHandler}
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
                {errors.password && <ErrorField error={errors.password} />}
              </div>
              <div className="input_feild">
                <button type="button" className="form_btn" onClick={handleSubmit}>
                  {t('Register')}
                  <img src={RegisterIcon} alt="" className="register_icon" />
                </button>
                <p className="form_account_p">
                  {t('You have an account?')}
                  <Link to="/login">
                    <span className="form_span"> {t('Login')}</span>
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
