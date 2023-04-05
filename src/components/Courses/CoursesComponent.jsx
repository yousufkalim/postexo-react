import { React, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Player from '../Player/Player';
import convertMsToTime from '../../utils/common';

function CoursesComponent({ sessions }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('token');

  const handleOpen = (item) => {
    if (isLogin) {
      navigate(`/sessions/${item?._id}`);
    } else {
      setOpen(true);
    }
  };

  const handleNavigate = (matter) => {
    navigate(`/sessions/matter-sessions/${matter}`);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {open && (
        <Dialog maxWidth="xl" open={open} onClose={handleClose}>
          <div className="homePlayer">
            <Player setOpenVideo={setOpen} />
          </div>
        </Dialog>
      )}

      {sessions?.map((item) => (
        <div
          key={item._id}
          className={
            window.location.pathname === '/sessions' ? 'image-container2' : 'image-container'
          }
        >
          <img
            className="course-card-image"
            src={item?.resolution_file}
            alt=" "
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="Avatarcontent">
            {item.photos?.length > 0 && (
              <Carousel autoplay dots={false} className="custom_carousel">
                {item?.photos?.map((pic) => (
                  <div className="carousel_image_container">
                    {/* <h1>Test</h1> */}
                    <img src={pic} alt=" " />
                  </div>
                ))}
              </Carousel>
            )}
            {/* <div className="card-image-content-hover">
                <small className="text-ellipsis-2">{item?.subject}</small>
              </div>
              {item?.ratings?.length > 0 && (
                <div className="avatarRatings">
                  <div className="starRatings">
                    <img src={Star} alt="star" />
                    <div>
                      <small>
                        {item?.averageRating} {t('Rating')}
                      </small>
                    </div>
                  </div>
                </div>
              )} */}
          </div>
          <div className="video-icon-container">
            <div className="video-icon-container_notions">{item?.notions}</div>
            {/* eslint-disable-next-line */}
            {window.location.pathname === '/sessions' ? (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <img
                onClick={() => handleOpen(item)}
                onKeyDown={handleOpen}
                src={PLAYVIDEOICONSVG}
                alt="video-icon"
              />
            ) : (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <img
                src={PLAYVIDEOICONSVG}
                alt="video-icon"
                onClick={() => handleOpen(item)}
                onKeyDown={handleOpen}
              />
            )}
          </div>
          <div className="card-img-parent-container">
            <span className="position-pill">
              <p onClick={() => handleNavigate(item?.matter)} role="presentation">
                {item?.matter}
              </p>
            </span>
            <div className="d-flex space-between course_duration">
              {window.location.pathname === '/' ? null : (
                <p className="cours_time">
                  {item?.duration ? convertMsToTime(Number(item.duration) * 60 * 1000) : '0'}
                </p>
              )}
              <span className="time-pill" />
            </div>
            <div className="course-card-image-content">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="level_btn">
                  {' '}
                  {item?.student_level.length > 20
                    ? `${item.student_level.substring(0, 20)} ...`
                    : item?.student_level}
                </span>
                <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                <small className="card-image-content">
                  {item?.likes?.length} {t('Likes')}{' '}
                </small>
              </div>
              <div>
                <div className="card-image-content2 text-ellipsis-2">{item?.subject}</div>
              </div>
              <div>
                <small className="card-image-content">
                  {moment(item?.created_at).format('hh:mm A dddd DD, MMM YYYY')}
                </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CoursesComponent;
