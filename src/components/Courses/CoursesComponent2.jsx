import React from 'react';
import { Avatar } from 'antd';
import COURSECARDSVG from '../../assets/COURSECARDSVG.svg';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';
import COURSECARDSVGTWO from '../../assets/COURSECARDSVGTWO.svg';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';
import Star from '../../assets/Star.svg';
import Pic4 from '../../assets/Pic1.svg';
import Pic5 from '../../assets/Pic2.svg';

function CoursesComponent2() {
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
  return (
    <>
      {cardsArray.map((_) => (
        <div className="image-container_row">
          <img className="course-card-image" src={_?.img} alt={_?.alt} />
          <div className="card-img-parent-container2">
            <div className="d-flex space-between">
              <span className="time-pill" />
              <span className="position-pill">UX Design</span>
            </div>
            <div className="video-icon-container">
              <img src={PLAYVIDEOICONSVG} alt="video-icon" />
            </div>
            <div className="Avatarcontent">
              <div className="card-image-content-hover">
                <small>How to Create a Useful & Excellent Optimized Section </small>
              </div>
              <div className="avatarRatings2">
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
                    <small>3.9 Rating</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="course-card-image-content">
              <div>
                <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                <small className="card-image-content">3.5k Likes </small>
              </div>
              <div>
                <small className="card-image-content2">
                  How to Create a Useful & Excellent Optimized Section{' '}
                </small>
              </div>
              <div>
                <small className="card-image-content">7:30 PM Thursday 21, Apr 2022 </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CoursesComponent2;
