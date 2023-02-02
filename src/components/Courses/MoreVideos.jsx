import React from 'react';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Star from '../../assets/Star.svg';
import Pic4 from '../../assets/Pic2.png';

function MoreVideos({ sessions }) {
  const navigate = useNavigate();

  const handleNavigate = (matter, e) => {
    e.stopPropagation();
    navigate(`/sessions/matter-sessions/${matter}`);
  };

  const handleSelectVideo = (item) => {
    navigate(`/sessions/${item?._id}`);
    // setCurrentVideo(item);
  };

  return (
    <>
      {sessions.map((item) => (
        <div
          role="presentation"
          onClick={() => handleSelectVideo(item)}
          key={item._id}
          className="image_container_videos"
        >
          <p className="cours_time">{`${item?.duration}:00`}</p>
          <img className="course-card-image" src={item?.resolution_file} alt="session" />
          <div className="card-img-parent-container">
            <div className="d-flex space-between">
              <span className="time-pill" />
              <span className="position-pill">
                <p role="presentation" onClick={(e) => handleNavigate(item?.matter, e)}>
                  {item?.matter}
                </p>
              </span>
            </div>
            <div className="video-icon-container">
              {/* eslint-disable-next-line */}
              <img src={PLAYVIDEOICONSVG} alt="video-icon" />
            </div>
            <div className="Avatarcontent">
              <div className="card-image-content-hover">
                <p>{item?.subject}</p>
              </div>
              {item?.ratings?.length > 0 && (
                <div className="avatarRatings">
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{ backgroundColor: 'transparent', border: 'none' }}
                    maxPopoverTrigger="click"
                  >
                    {item?.ratings?.map((rate) => (
                      <Avatar
                        style={{
                          border: 'none',
                        }}
                        key={rate._id}
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
              {/* <div className="avatarRatings">
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
              </div> */}
            </div>
            <div className="course-card-image-content">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="level_btn">{item?.student_level}</span>
                <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                <p className="card-image-content">{item?.likes?.length} Likes</p>
              </div>
              <div>
                <div className="card_image_content_video text-ellipsis-2">{item?.subject}</div>
              </div>
              <div>
                <p className="card-image-content-video">
                  {moment(item?.created_at).format('hh:mm A dddd DD, MMM YYYY')}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MoreVideos;
