/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import LOGOSVG from '../assets/LOGO.svg';
import LOGINSVG from '../assets/LOGIN.svg';
import REGISTERSVG from '../assets/REGISTER.svg';
import Flag from '../assets/home/flag.png';
import FrFlag from '../assets/home/fran_flag.png';

function Navbar() {
  const [showBtn, setShowBtn] = useState(false);
  const { i18n, t } = useTranslation();

  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setShowBtn(!showBtn);
  };

  return (
    <nav className="nav-container">
      <div>
        <Link to="/">
          <img className="navbar-logo-svg" src={LOGOSVG} alt="postexologo" />
        </Link>
      </div>
      <div className="navbar-btn-container">
        <Button
          onClick={() => handleNavigate('/login')}
          className="navbar-btn"
          text={t('Login')}
          src={LOGINSVG}
        />

        <Button
          onClick={() => handleNavigate('/register')}
          className="navbar_register_btn navbar-btn"
          text={t('Register')}
          src={REGISTERSVG}
        />
        {showBtn ? (
          <button className="trans_btn" type="button" onClick={() => changeLanguage('fr')}>
            <img src={FrFlag} alt="Flag" />
            FR
          </button>
        ) : (
          <button className="trans_btn" type="button" onClick={() => changeLanguage('en')}>
            <img src={Flag} alt="Flag" />
            EN
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
