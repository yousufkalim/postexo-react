import React from 'react';

function Small({ text, className }) {
  return <small className={`${className} font-weight-600`}>{text}</small>;
}

export default Small;
