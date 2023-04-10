/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import moment from 'moment';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Star from '../../assets/Star.svg';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';
import convertMsToTime from '../../utils/common';

function CoursesComponent2({ sessions, setPage, hasMore }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/sessions/${item._id}`);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div className="topCoursesAll">
        {sessions?.map((_) => (
          <div key={_._id} className="image-container_row image-container_row_full">
            <img
              src={_?.resolution_file}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              className="image_container_banner"
              alt="video-icon"
            />
            <p className="cours_time">
              {_?.duration ? convertMsToTime(Number(_.duration) * 1000) : '0'}
            </p>
            <div className="Avatarcontent">
              {_.photos?.length > 0 && (
                <Carousel autoplay dots={false} className="custom_carousel_full">
                  {_?.photos?.map((pic) => (
                    <div className="carousel_image_container_full">
                      {/* <h1>Test</h1> */}
                      <img src={pic} alt="test" />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
            <img className="course-card-image" src={_?.img} alt={_?.alt} />
            <div className="video-icon-container">
              <div className="video-icon-container_notions">{_?.notions}</div>
              <img
                src={PLAYVIDEOICONSVG}
                alt="video-icon"
                className="video-icon-container_play"
                onClick={() => handleClick(_)}
                onKeyDown={() => handleClick(_)}
              />
            </div>
            <div className="card-img-parent-container2 card-img-parent-container2_full">
              <div className="d-flex space-between">
                <span className="time-pill" />
                <span className="position-pill">{_?.matter}</span>
              </div>
              <div className="card_courses_contant">
                <div className="course-card-image-content">
                  <div className="course_likes">
                    <span className="level_btn">{_?.student_level}</span>
                    <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                    <small className="card-image-content">
                      {_?.likes?.length} {t('Likes')}
                    </small>
                    <div className="rating_stars">
                      <img src={Star} alt="star" />
                      <div>
                        <small className="card-image-content">
                          &nbsp;{_?.averageRating} {t('Rating')}
                        </small>
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
      </div>

      {hasMore && (
        <div className="has_more_container">
          <button
            type="button"
            className="has_more_btn"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default CoursesComponent2;
