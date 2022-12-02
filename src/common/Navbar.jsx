import React from 'react';
import Button from './Button';

import LOGOSVG from '../assets/LOGO.svg';
import LOGINSVG from '../assets/LOGIN.svg';
import REGISTERSVG from '../assets/REGISTER.svg';

function Navbar(props) {
  const { btn } = props;
  return (
    <nav className="nav-container">
      <div>
        <img className="navbar-logo-svg" src={LOGOSVG} alt="postexologo" />
      </div>
      {btn && (
        <div className="navbar-btn-container">
          <Button className="navbar-btn" text="Login" src={LOGINSVG} />
          <Button className="navbar-btn" text="Register" src={REGISTERSVG} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
