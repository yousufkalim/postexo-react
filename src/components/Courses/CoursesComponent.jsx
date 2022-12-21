import { React, useState } from 'react';
import { Avatar } from 'antd';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Star from '../../assets/Star.svg';
import Pic4 from '../../assets/Pic1.svg';
import Player from '../Player/Player';

function CoursesComponent({ sessions }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('token');

  const handleOpen = (item) => {
    if (isLogin) {
      navigate(`/video/${item?._id}`);
    } else {
      setOpen(true);
    }
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
          className={window.location.pathname === '/home' ? 'image-container2' : 'image-container'}
        >
          {window.location.pathname === '/' ? null : <p className="cours_time">{item?.duration}</p>}
          <img className="course-card-image" src={item?.resolution_file} alt="thumbnail" />
          <div className="card-img-parent-container">
            <div className="d-flex space-between">
              <span className="time-pill" />
              <span className="position-pill">
                <p>{item?.matter}</p>
              </span>
            </div>
            <div className="video-icon-container">
              {/* eslint-disable-next-line */}
              {window.location.pathname === '/home' ? (
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
            <div className="Avatarcontent">
              <div className="card-image-content-hover">
                <small>{item?.subject}</small>
              </div>
              {item?.ratings?.length > 0 && (
                <div className="avatarRatings">
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{ backgroundColor: 'transparent', border: 'none' }}
                    maxPopoverTrigger="click"
                  >
                    {item?.ratings?.map(() => (
                      <Avatar
                        style={{
                          border: 'none',
                        }}
                        alt="Remy Sharp"
                        src={Pic4}
                      />
                    ))}
                  </Avatar.Group>
                  <div className="starRatings">
                    <img src={Star} alt="star" />
                    <div>
                      <small>{item?.averageRating} Rating</small>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="course-card-image-content">
              <div>
                <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                <small className="card-image-content">{item?.likes?.length} Likes </small>
              </div>
              <div>
                <small className="card-image-content2">{item?.subject}</small>
              </div>
              <div>
                <small className="card-image-content">
                  {moment(item?.createdAt).format('hh:mm A dddd DD, MM YYYY')}
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
