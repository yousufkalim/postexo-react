import React from 'react';
import { useTranslation } from 'react-i18next';

function ErrorField({ error }) {
  const { t } = useTranslation();

  return <div className="error_text">{t(error)}</div>;
}

export default ErrorField;
