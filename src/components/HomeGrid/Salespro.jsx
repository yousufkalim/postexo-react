import React from 'react';
import { useTranslation } from 'react-i18next';

function Salespro() {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="Salespro_center">
      <div className="Sales_content">
        <p className="Salespro_title">
          {t('Hello')} {user?.name}
        </p>
        <p className="Salespro_p">
          {t(
            'Welcome to PostExo! Explore our courses and take the first step towards enhancing your knowledge and skills.',
          )}
        </p>
      </div>
    </div>
  );
}

export default Salespro;
