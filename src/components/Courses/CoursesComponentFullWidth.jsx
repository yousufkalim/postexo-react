/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Star from '../../assets/Star.svg';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';

function CoursesComponent2({ sessions }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/sessions/${item._id}`);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {sessions?.map((_) => (
        <div key={_._id} className="image-container_row image-container_row_full">
          <img src={_?.resolution_file} className="image_container_banner" alt="video-icon" />
          <p className="cours_time">{`${_?.duration}:00`}</p>
          <img className="course-card-image" src={_?.img} alt={_?.alt} />
          <div className="card-img-parent-container2 card-img-parent-container2_full">
            <div className="d-flex space-between">
              <span className="time-pill" />
              <span className="position-pill">{_?.matter}</span>
            </div>
            <img
              src={PLAYVIDEOICONSVG}
              alt="video-icon"
              className="video-icon-container_play"
              onClick={() => handleClick(_)}
              onKeyDown={() => handleClick(_)}
            />
            <div className="Avatarcontent">
              <div className="card-image-content-hover">
                <small>{_?.subject} </small>
              </div>
            </div>
            <div className="card_courses_contant">
              <div className="course-card-image-content">
                <div className="course_likes">
                  <span className="level_btn">{_?.student_level}</span>
                  <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                  <small className="card-image-content">{_?.likes?.length} Likes</small>
                  <div className="rating_stars">
                    <img src={Star} alt="star" />
                    <div>
                      <small className="card-image-content">&nbsp;{_?.averageRating} Rating</small>
                    </div>
                  </div>
                </div>
                <div>
                  <small className="card-image-content2">{_?.subject}</small>
                </div>
                <div>
                  <small className="card-image-content">
                    {moment(_?.created_at).format('hh:mm A dddd DD, MMM YYYY')}{' '}
                  </small>
                </div>
              </div>
              <div className="avatarRatings2">
                {/* <Avatar.Group
                  maxCount={2}
                  maxStyle={{ backgroundColor: 'transparent', border: 'none' }}
                  maxPopoverTrigger="click"
                >
                  {_?.ratings?.map((rate) => (
                    <Avatar
                      id={rate._id}
                      style={{
                        border: 'none',
                      }}
                      alt="Remy Sharp"
                      src={Pic4}
                    />
                  ))}
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
