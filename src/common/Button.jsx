import React from 'react';

function Button({ text, className, src, ...rest }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button {...rest} className={`${className}`} type="submit">
      <img className="navbar-login-svg" src={src} alt="loginicon" />
      {text}
    </button>
  );
}

export default Button;
