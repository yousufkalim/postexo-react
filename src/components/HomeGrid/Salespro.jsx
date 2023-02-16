import React from 'react';

function Salespro() {
  const user = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="Salespro_center">
      <div className="Sales_content">
        <p className="Salespro_title">Hello {user?.name}</p>
        <p className="Salespro_p">
          Welcome to PostExo! Explore our courses and take the first step towards enhancing your
          knowledge and skills.
        </p>
      </div>
    </div>
  );
}

export default Salespro;
