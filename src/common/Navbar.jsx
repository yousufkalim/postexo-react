import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import LOGOSVG from '../assets/LOGO.svg';
import LOGINSVG from '../assets/LOGIN.svg';
import REGISTERSVG from '../assets/REGISTER.svg';

function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
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
          text="Login"
          src={LOGINSVG}
        />

        <Button
          onClick={() => handleNavigate('/register')}
          className="navbar_register_btn navbar-btn"
          text="Register"
          src={REGISTERSVG}
        />
      </div>
    </nav>
  );
}

export default Navbar;
