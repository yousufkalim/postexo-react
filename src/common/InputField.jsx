/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function InputField({ type, placeholder, className, labelText }) {
  return (
    <div className="input-div">
      <label className="label">{labelText}</label>
      <input type={type} placeholder={placeholder} className={className || 'input-field'} />
    </div>
  );
}

export default InputField;
