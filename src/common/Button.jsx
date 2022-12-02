import React from 'react';

function Button({ text, className, src }) {
  return (
    <button className={`d-flex jcc aic pointer ${className}`} type="button">
      <img className="navbar-login-svg" src={src} alt="loginicon" />
      {text}
    </button>
  );
}

export default Button;
