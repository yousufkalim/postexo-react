import React from 'react';
import { Empty } from 'antd';
import Spinner from './Spinner';

function NoDataFound({ loading, data, children }) {
  if (loading) {
    return <Spinner className="session_content_loading" />;
  }
  if (!loading && !data.length) {
    return <Empty className="no_data_found" />;
  }
  return children;
}

export default NoDataFound;
