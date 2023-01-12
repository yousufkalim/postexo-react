/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Star from '../../assets/Star.svg';
import Pic4 from '../../assets/Pic1.svg';

function CoursesComponent2({ sessions }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/sessions/${item.id}`);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {sessions?.map((_) => (
        <div className="image-container_row">
          <p className="cours_time">20:32</p>
          <img className="course-card-image" src={_?.img} alt={_?.alt} />
          <div className="card-img-parent-container2">
            <div className="d-flex space-between">
              <span className="time-pill" />
              <span className="position-pill">{_?.matter}</span>
            </div>
            <div className="video-icon-container">
              <img
                src={_?.resolution_file}
                alt="video-icon"
                onClick={() => handleClick(_)}
                onKeyDown={() => handleClick(_)}
              />
            </div>
            <div className="Avatarcontent">
              <div className="card-image-content-hover">
                <small>{_?.subject} </small>
              </div>
            </div>
            <div className="card_courses_contant">
              <div className="course-card-image-content">
                <div className="course_likes">
                  <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                  <small className="card-image-content">
                    {_?.likes?.length > 0 && _?.likes?.length}
                  </small>
                  <div className="rating_stars">
                    <img src={Star} alt="star" />
                    <div>
                      <small>&nbsp;{_?.averageRating} Rating</small>
                    </div>
                  </div>
                </div>
                <div>
                  <small className="card-image-content2">{_?.subject}</small>
                </div>
                <div>
                  <small className="card-image-content">
                    {moment(_?.createdAt).format('hh:mm A dddd DD, MM YYYY')}{' '}
                  </small>
                </div>
              </div>
              <div className="avatarRatings2">
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{ backgroundColor: 'transparent', border: 'none' }}
                  maxPopoverTrigger="click"
                >
                  {_?.ratings?.map(() => (
                    <Avatar
                      style={{
                        border: 'none',
                      }}
                      alt="Remy Sharp"
                      src={Pic4}
                    />
                  ))}
                </Avatar.Group>
                {/* <Avatar.Group
                  maxCount={3}
                  maxStyle={{ backgroundColor: 'transparent', border: 'none' }}
                  maxPopoverTrigger="click"
                  className="avatar_groups"
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
                </Avatar.Group> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CoursesComponent2;
