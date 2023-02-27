import React from 'react';
import { useTranslation } from 'react-i18next';

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div className="page_not_found">
      <h1>{t('404 - PAGE NOT FOUND')}</h1>
    </div>
  );
}

export default PageNotFound;
