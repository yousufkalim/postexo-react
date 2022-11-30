import React from 'react';
import Image from './Image';

function Button({ text, className, src }) {
  return (
    <button className={`d-flex jcc aic pointer ${className}`} type="button">
      <Image className="navbar-login-svg" src={src} alt="loginicon" />
      {text}
    </button>
  );
}

export default Button;
