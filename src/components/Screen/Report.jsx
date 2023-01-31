import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import CroseIcon from '../../assets/CroseIcon.svg';
import API from '../../api/index';

function Report({ open, setOpen, sessionId, userId }) {
  const [report, setReport] = useState({
    email: '',
    subject: '',
    comment: '',
  });
  const [submitted, setSumbitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmittedClose = () => {
    setSumbitted(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSendReport = async () => {
    try {
      await API('post', `/reports`, {
        user: userId,
        session: sessionId,
        email: report.email,
        subject: report.subject,
        comment: report.comment,
      }).then(() => {
        toast.success('Report submitted successfully');
        setReport({
          email: '',
          subject: '',
          comment: '',
        });
      });
      setSumbitted(true);
      setOpen(false);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="popup">
        <Dialog maxWidth="xl" open={open} onClose={handleClose} className="popDialog">
          <div className="forgotPopup">
            {
              // eslint-disable-next-line
              <img
                src={CroseIcon}
                alt="close"
                className="croseIcon"
                onClick={handleClose}
                onKeyDown={handleClose}
              />
            }
            <p className="forgot_title">Report</p>
            <p className="forgot_p">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <div className="input_feild" style={{ textAlign: 'left' }}>
              <label htmlFor="a" className="input_report_label">
                Email
                <input
                  id="a"
                  type="email"
                  className="form_input border"
                  placeholder="abc@postexo.com"
                  value={report.email}
                  name="email"
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </label>
            </div>
            <div className="input_feild" style={{ textAlign: 'left' }}>
              <label htmlFor="b" className="input_report_label">
                Subject
                <input
                  id="b"
                  type="text"
                  className="form_input border"
                  placeholder="Inappropriate"
                  value={report.subject}
                  name="subject"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="input_feild" style={{ textAlign: 'left' }}>
              <label htmlFor="c" className="input_comment_label">
                Comment
                <textarea
                  id="c"
                  type="text"
                  className="text-area"
                  placeholder="Type here"
                  value={report.comment}
                  name="comment"
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className="forgotBtn" type="button" onClick={handleSendReport}>
              Send Report
            </button>
          </div>
        </Dialog>
      </div>
      {submitted && (
        <div className="popup">
          <Dialog
            maxWidth="xl"
            open={submitted}
            onClose={handleSubmittedClose}
            className="popDialog"
          >
            <div className="forgotPopup">
              {
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <img
                  src={CroseIcon}
                  alt="close"
                  className="croseIcon"
                  onClick={handleSubmittedClose}
                  onKeyDown={handleSubmittedClose}
                />
              }
              <p className="forgot_title" style={{ marginBottom: '8px' }}>
                Your Report has been Submit
              </p>

              <p className="forgot_p">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default Report;
