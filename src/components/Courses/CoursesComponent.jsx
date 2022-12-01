import React from 'react';

import COURSECARDSVG from '../../assets/COURSECARDSVG.svg';
import PLAYVIDEOICONSVG from '../../assets/PLAYVIDEOICONSVG.svg';
import COURSECARDSVGTWO from '../../assets/COURSECARDSVGTWO.svg';
import LIKEICONSVG from '../../assets/LIKEICONSVG.svg';

function CoursesComponent() {
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
        <div className="d-flex image-container pointer">
          <img className="course-card-image" src={_?.img} alt={_?.alt} />
          <div className="card-img-parent-container w-100 z-index d-flex flex-col space-between">
            <div className="d-flex space-between">
              <span className="time-pill pills-spacing b-radius-1000 font-weight-600">20:31</span>
              <span className="position-pill pills-spacing b-radius-1000 font-weight-600 d-flex aic">
                UX Design
              </span>
            </div>
            <div className="video-icon-container d-flex jcc">
              <img src={PLAYVIDEOICONSVG} alt="video-icon" />
            </div>
            <div className="course-card-image-content d-flex flex-col common-font-size">
              <div>
                <img className="like-icon" src={LIKEICONSVG} alt="like-icon" />
                <small>3.5k Likes </small>
              </div>
              <div>
                <small>How to Create a Useful & Excellent Optimized Section </small>
              </div>
              <div>
                <small>7:30 PM Thursday 21, Apr 2022 </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CoursesComponent;
