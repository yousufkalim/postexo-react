import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CheckCircle from '../../assets/CheckCircle.svg';
import PopupArrow from '../../assets/PopupArrow.svg';

function Popup({ open }) {
  const { t } = useTranslation();

  return (
    <div className="popup">
      <Dialog maxWidth="lg" open={open} className="popDialog">
        <div className="main_popup">
          <div className="popup_container">
            <p className="popup_title_p">{t('For individuals')}</p>
            <p className="popup_title">{t('Annual')}</p>
            <p className="popup_heading">
              Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.
            </p>
            <div className="monthly">
              <span className="monthly_title">$397</span>
              <span className="monthly_p">/{t('monthly')}</span>
            </div>
            <p className="credit_card">{t('credit card payment system only')}</p>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                {t('have access to videos associated with their grade level 6th/month')}
              </p>
            </div>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                {t('have access to all the videos of the 18th/month platform')}
              </p>
            </div>
            <Link to="/register">
              <button type="button" className="popupBtn">
                {t('Register')}
                <img src={PopupArrow} alt="" className="popupArrow" />
              </button>
            </Link>
          </div>
          <div className="popup_container2">
            <p className="popup_title_p">{t('1 year commitment')}:</p>
            <p className="popup_title">{t('Enterprise')}</p>
            <p className="popup_heading">
              Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.
            </p>
            <div className="monthly">
              <span className="monthly_title">$199+</span>
              <span className="monthly_p">/{t('monthly')}</span>
            </div>
            <p className="credit_card">{t('credit card payment system only')}</p>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                {t('have access to videos associated with their grade level 6th/month')}
              </p>
            </div>
            <div className="have_access">
              <img src={CheckCircle} alt="" className="popupCheck" />
              <p className="have_access_p">
                {t('have access to all the videos of the 18th/month platform')}
              </p>
            </div>
            <Link to="/register">
              <button type="button" className="popupBtn">
                {t('Register')}
                <img src={PopupArrow} alt="" className="popupArrow" />
              </button>
            </Link>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Popup;
