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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s,
        </p>
      </div>
    </div>
  );
}

export default Salespro;
