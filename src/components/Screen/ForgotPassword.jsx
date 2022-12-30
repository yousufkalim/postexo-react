/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import ForgetBg from '../../assets/ForgetBg.svg';
import CroseIcon from '../../assets/CroseIcon.svg';
import API from '../../api/index';

function ForgotPassword({ open, setOpen }) {
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForget = async () => {
    try {
      await API('put', `/auth/forgot/${email}`).then((res) => {
        toast.success(res.data.message);
        setOpen(false);
        setEmail('');
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err, 'login err');
    }
  };
  return (
    <div className="popup">
      <Dialog maxWidth="xl" open={open} onClose={handleClose} className="popDialog">
        <div className="forgotPopup">
          <img src={ForgetBg} alt="" className="forgetBg" />
          <img
            src={CroseIcon}
            alt=""
            className="croseIcon"
            onClick={handleClose}
            onKeyDown={handleClose}
          />
          <p className="forgot_title">Forgot Password</p>
          <p className="forgot_p">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          <div className="input_feild2">
            <label htmlFor="b" className="input_label2">
              Email
              <input
                style={{ background: '#2b2926' }}
                id="b"
                type="text"
                className="form_input"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </label>
          </div>
          <button className="forgotBtn" type="button" onClick={handleForget}>
            Send Reset Instructions
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default ForgotPassword;
