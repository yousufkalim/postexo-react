import React from 'react';
import Button from './Button';
import Image from './Image';

import LOGOSVG from '../assets/LOGO.svg';
import LOGINSVG from '../assets/LOGIN.svg';
import REGISTERSVG from '../assets/REGISTER.svg';

function Navbar() {
  return (
    <nav className="d-flex space-between navbar-spacing aic">
      <div>
        <Image className="navbar-logo-svg" src={LOGOSVG} alt="postexologo" />
      </div>
      <div className="d-flex space-between navbar-btn-container">
        <Button className="navbar-btn white-font b-radius-1000" text="Login" src={LOGINSVG} />
        <Button className="navbar-btn white-font b-radius-1000" text="Register" src={REGISTERSVG} />
      </div>
    </nav>
  );
}

export default Navbar;
