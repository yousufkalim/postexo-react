import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import CroseIcon from '../../assets/CroseIcon.svg';
import API from '../../api/index';
import { handleBlur } from '../../utils/form';
import ErrorField from '../../common/ErrorField';

function Report({ open, setOpen, sessionId, userId }) {
  const { t } = useTranslation();
  const [report, setReport] = useState({
    email: '',
    subject: '',
    comment: '',
  });
  const [errors, setErrors] = useState({
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
  const blurHandler = (e) => {
    handleBlur(e, errors, setErrors);
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
        toast.success(t('Report submitted successfully'));
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

  const disableBtn = !(report.email && report.subject && report.comment);

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
            <p className="forgot_title">{t('Report')}</p>
            <p className="forgot_p">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            <div className="input_feild" style={{ textAlign: 'left' }}>
              <label htmlFor="a" className="input_report_label">
                {t('Email')}
                <input
                  id="a"
                  type="email"
                  className="form_input border"
                  placeholder="abc@postexo.com"
                  value={report.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={blurHandler}
                  autoComplete="new-password"
                />
              </label>
              {errors.email && <ErrorField error={errors.email} />}
            </div>
            <div className="input_feild" style={{ textAlign: 'left' }}>
              <label htmlFor="b" className="input_report_label">
                {t('Subject')}
                <input
                  id="b"
                  type="text"
                  className="form_input border"
                  placeholder={t('Inappropriate')}
                  value={report.subject}
                  name="subject"
                  onChange={handleChange}
                  onBlur={blurHandler}
                />
              </label>
              {errors.subject && <ErrorField error={errors.subject} />}
            </div>
            <div className="input_feild" style={{ textAlign: 'left' }}>
              <label htmlFor="c" className="input_comment_label">
                {t('Comment')}
                <textarea
                  id="c"
                  type="text"
                  className="text-area"
                  placeholder={t('Type here')}
                  value={report.comment}
                  name="comment"
                  onChange={handleChange}
                  onBlur={blurHandler}
                />
              </label>
              {errors.comment && <ErrorField error={errors.comment} />}
            </div>
            <button
              disabled={disableBtn}
              className="forgotBtn"
              type="button"
              onClick={handleSendReport}
            >
              {t('Send Report')}
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
                {t('Your Report has been Submit')}
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
