import React from 'react';
import FILTERICONSVG from '../../assets/FILTERICONSVG.svg';
import CoursesComponent from '../Courses/CoursesComponent';

function Courses() {
  return (
    <div className="course">
      <section className="section-need-a-teacher-courses">
        <div className="courses-div">
          <h4 className="courses_h4">Courses</h4>
          {/* <H1 text="Courses" /> */}
          <div className="btn-filter">
            <span className="filter">Filter</span>
            <img className="filter-courses-icon" src={FILTERICONSVG} alt="FILTERICONSVG" />
          </div>
        </div>
      </section>
      <section className="section-need-a-teacher-courses2">
        <div className="courseComp-div">
          <CoursesComponent />
        </div>
      </section>
    </div>
  );
}

export default Courses;
