import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import LOGOSVG from '../assets/LOGO.svg';
import LOGINSVG from '../assets/LOGIN.svg';
import REGISTERSVG from '../assets/REGISTER.svg';

function Navbar() {
  return (
    <nav className="nav-container">
      <div>
        <Link to="/">
          <img className="navbar-logo-svg" src={LOGOSVG} alt="postexologo" />
        </Link>
      </div>
      <div className="navbar-btn-container">
        <Link to="/login">
          <Button className="navbar-btn" text="Login" src={LOGINSVG} />
        </Link>
        <Link to="/register">
          <Button className="navbar-btn" text="Register" src={REGISTERSVG} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
