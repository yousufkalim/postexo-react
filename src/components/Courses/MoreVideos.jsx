import { React, useState } from 'react';
import { Avatar } from 'antd';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import COURSECARDSVG from '../../assets/COURSECARDSVG.svg';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';
import COURSECARDSVGTWO from '../../assets/COURSECARDSVGTWO.svg';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Star from '../../assets/Star.svg';
import Pic4 from '../../assets/Pic1.svg';
import Pic5 from '../../assets/Pic2.svg';
import Player from '../Player/Player';

function MoreVideos() {
  const cardsArray = [
    {
      id: '1',
      text: 'cardone',
      img: COURSECARDSVG,
      alt: 'course-card-image-1',
    },
    {
      id: '2',
      text: 'cardtwo',
      img: COURSECARDSVGTWO,
      alt: 'course-card-image-2',
    },
    {
      id: '3',
      text: 'cardtwo',
      img: COURSECARDSVGTWO,
      alt: 'course-card-image-3',
    },
    {
      id: '4',
      text: 'cardtwo',
      img: COURSECARDSVGTWO,
      alt: 'course-card-image-4',
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: 'none',
    boxShadow: 24,
  };
  return (
    <>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Player />
          </Box>
        </Modal>
      )}
      {cardsArray.map((_) => (
        <div key={_.id} className="image_container_videos">
          <p className="cours_time">20:31</p>
          <img className="course-card-image" src={_?.img} alt={_?.alt} />
          <div className="card-img-parent-container">
            <div className="d-flex space-between">
              <span className="time-pill" />
              <span className="position-pill">
                <p>UX Design</p>
              </span>
            </div>
            <div className="video-icon-container">
              {/* eslint-disable-next-line */}
              <img src={PLAYVIDEOICONSVG} alt="video-icon" onClick={handleOpen} />
            </div>
            <div className="Avatarcontent">
              <div className="card-image-content-hover">
                <p>How to Create a Useful & Excellent Optimized Section </p>
              </div>
              <div className="avatarRatings">
                <Avatar.Group
                  maxCount={3}
                  maxStyle={{ backgroundColor: 'transparent', border: 'none' }}
                  maxPopoverTrigger="click"
                >
                  <Avatar
                    style={{
                      border: 'none',
                    }}
                    alt="Remy Sharp"
                    src={Pic4}
                  />
                  <Avatar
                    style={{
                      border: 'none',
                    }}
                    alt="Travis Howard"
                    src={Pic5}
                  />
                  <Avatar
                    style={{
                      border: 'none',
                    }}
                    alt="Cindy Baker"
                    src={Pic5}
                  />
                  <Avatar
                    style={{
                      border: 'none',
                    }}
                    alt="Cindy Baker"
                    src={Pic5}
                  />
                  <Avatar
                    style={{
                      border: 'none',
                    }}
                    alt="Cindy Baker"
                    src={Pic5}
                  />
                  <Avatar
                    style={{
                      border: 'none',
                    }}
                    alt="Cindy Baker"
                    src={Pic5}
                  />
                </Avatar.Group>
                <div className="starRatings">
                  <img src={Star} alt="star" />
                  <div>
                    <p>3.9 Rating</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="course-card-image-content">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                <p className="card-image-content">3.5k Likes </p>
              </div>
              <div>
                <p className="card_image_content_video">
                  How to Create a Useful & Excellent Optimized Section{' '}
                </p>
              </div>
              <div>
                <p className="card-image-content-video">7:30 PM Thursday 21, Apr 2022 </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MoreVideos;
