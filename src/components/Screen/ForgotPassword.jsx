import React from 'react';
import Dialog from '@mui/material/Dialog';

function ForgotPassword({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="popup">
      <Dialog maxWidth="xl" open={open} onClose={handleClose} className="popDialog">
        <div className="forgotPopup">
          <p className="forgot_title">Forgot Password</p>
          <div className="input_feild">
            <label htmlFor="b" className="input_label2">
              Email
              <input
                style={{ background: '#2b2926' }}
                id="b"
                type="text"
                className="form_input"
                placeholder="Enter your email"
              />
            </label>
          </div>
          <button className="forgotBtn" type="button">
            Submit
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default ForgotPassword;
