import React from 'react';
// import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import Spinner from './Spinner';

function NoDataFound({ loading, data, children }) {
  const { t } = useTranslation();
  if (loading) {
    return <Spinner className="session_content_loading" />;
  }
  if (!loading && !data.length) {
    return <div className="no_data_found">{t('No video found')}</div>;
  }
  return children;
}

export default NoDataFound;
