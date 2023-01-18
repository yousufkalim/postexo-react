import React from 'react';
import { Spin } from 'antd';

function Spinner({ className }) {
  return <Spin size="large" className={`${className} spinner`} />;
}

export default Spinner;
