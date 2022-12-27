/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import API from '../api';

const UserInfo = (WrappedComponent) => {
  function ModifiedFunction(props) {
    const [userInfo, setUserInfo] = useState({});

    const user = JSON.parse(localStorage.getItem('userData'));

    const getUserInfo = async () => {
      await API('get', `/users/${user?._id}`)
        .then((res) => {
          console.log('USER INFORMATION ====> ', res);
          setUserInfo(res?.data?.user);
        })
        .catch((err) => console.log('USER INFORMATION ====> ERROR ==> ', err));
    };

    useEffect(() => {
      getUserInfo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <WrappedComponent {...props} getUserInfo={getUserInfo} userInfo={userInfo} />;
  }

  return ModifiedFunction;
};

export default UserInfo;
