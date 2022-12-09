import React from 'react';
import { Link } from 'react-router-dom';
import LOGOSVG from '../../assets/LOGO.svg';

function RegisterNavbar() {
  return (
    <nav className="nav-container" style={{ marginTop: '7px' }}>
      <div className="logo">
        <Link to="/">
          <img className="navbar-logo-svg" src={LOGOSVG} alt="postexologo" />
        </Link>
      </div>
    </nav>
  );
}

export default RegisterNavbar;
