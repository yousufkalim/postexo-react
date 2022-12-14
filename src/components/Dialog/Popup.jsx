import React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CheckCircle from '../../assets/CheckCircle.svg';
import PopupArrow from '../../assets/PopupArrow.svg';

function Popup({ open, setOpen }) {
  // const [open, setOpen] = React.useState(false);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="popup">
      <Dialog maxWidth="lg" open={open} onClose={handleClose} className="popDialog">
        <div className="main_popup">
          <div className="popup_container">
            <p className="popup_title_p">For individuals</p>
            <p className="popup_title">Annual</p>
            <p className="popup_heading">
              Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.
            </p>
            <div className="monthly">
              <span className="monthly_title">$397</span>
              <span className="monthly_p">/monthly</span>
            </div>
            <p className="credit_card">credit card payment system only</p>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                have access to videos associated with their grade level 6th/month
              </p>
            </div>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                have access to all the videos of the 18th/month platform
              </p>
            </div>
            <button type="button" className="popupBtn">
              Register
              <img src={PopupArrow} alt="" className="popupArrow" />
            </button>
          </div>
          <div className="popup_container2">
            <p className="popup_title_p">1 year commitment:</p>
            <p className="popup_title">Enterprise</p>
            <p className="popup_heading">
              Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.
            </p>
            <div className="monthly">
              <span className="monthly_title">$199+</span>
              <span className="monthly_p">/monthly</span>
            </div>
            <p className="credit_card">credit card payment system only</p>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                have access to videos associated with their grade level 6th/month
              </p>
            </div>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                have access to all the videos of the 18th/month platform
              </p>
            </div>
            <button type="button" className="popupBtn">
              Register
              <img src={PopupArrow} alt="" className="popupArrow" />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Popup;
