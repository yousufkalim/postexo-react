/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import ForgetBg from '../../assets/ForgetBg.svg';
import CroseIcon from '../../assets/CroseIcon.svg';
import ShowP from '../../assets/ShowP.svg';
import HideIcon from '../../assets/HideIcon.svg';
import API from '../../api/index';

function ChangePassword({ open, setOpen }) {
  const { t } = useTranslation();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  const [changePassword, setChangePassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };
  const togglePassword3 = () => {
    setPasswordShown3(!passwordShown3);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userData'));
      await API('put', `/auth/password/${user._id}`, {
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
        confirmPassword: changePassword.confirmPassword,
      }).then(() => {
        toast.success(t('Password Changed successfully'));
        setChangePassword({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setOpen(false);
        // }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err, 'login err');
    }
  };

  return (
    <div className="popup">
      <Dialog maxWidth="xl" open={open} onClose={handleClose} className="popDialog">
        <div
          style={{ background: ` url(${ForgetBg}) no-repeat top right/130px` }}
          className="forgotPopup"
        >
          {/* <img src={ForgetBg} alt="" className="forgetBg" /> */}
          <img
            src={CroseIcon}
            alt=""
            className="croseIcon"
            onClick={handleClose}
            onKeyDown={handleClose}
          />
          <p className="forgot_title">{t('Change Password')}</p>
          <p className="forgot_p">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          <div className="input_feild" style={{ textAlign: 'left' }}>
            <label htmlFor="a" className="input_label">
              {t('Old Password')}
              <input
                id="a"
                type={passwordShown ? 'text' : 'password'}
                className="form_input"
                placeholder={t('Enter your password')}
                value={changePassword.oldPassword}
                name="oldPassword"
                onChange={handleChange}
                autoComplete="new-password"
              />
              {/* eslint-disable-next-line  */}
              <img
                onClick={togglePassword}
                src={passwordShown ? ShowP : HideIcon}
                alt=""
                className="hidePassword"
              />
            </label>
          </div>
          <div className="input_feild" style={{ textAlign: 'left' }}>
            <label htmlFor="b" className="input_label">
              {t('New Password')}
              <input
                id="b"
                type={passwordShown2 ? 'text' : 'password'}
                className="form_input"
                placeholder={t('Enter your password')}
                value={changePassword.newPassword}
                name="newPassword"
                onChange={handleChange}
              />
              {/* eslint-disable-next-line  */}
              <img
                onClick={togglePassword2}
                src={passwordShown2 ? ShowP : HideIcon}
                alt=""
                className="hidePassword"
              />
            </label>
          </div>
          <div className="input_feild" style={{ textAlign: 'left' }}>
            <label htmlFor="c" className="input_label">
              {t('Confirm Password')}
              <input
                id="c"
                type={passwordShown3 ? 'text' : 'password'}
                className="form_input"
                placeholder={t('Enter your password')}
                value={changePassword.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
              />
              {/* eslint-disable-next-line  */}
              <img
                onClick={togglePassword3}
                src={passwordShown3 ? ShowP : HideIcon}
                alt=""
                className="hidePassword"
              />
            </label>
          </div>
          <button className="forgotBtn" type="button" onClick={handleChangePassword}>
            {t('Change Password')}
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default ChangePassword;
