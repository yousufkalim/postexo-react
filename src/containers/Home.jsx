import React from 'react';
import Navbar from '../common/Navbar';
import NEEDATEACHERREGBTNSVG from '../assets/NEEDATEACHERREGBTN.svg';
import FILTERICONSVG from '../assets/FILTERICONSVG.svg';
import CoursesComponent from '../components/Courses/CoursesComponent';

// eslint-disable-next-line no-shadow
function Home() {
  return (
    <header className="w-90 m-auto">
      <Navbar />
      <section className="section-need-a-teacher white-font">
        <div className="d-flex w-95 m-auto space-between">
          <div className="w-40 need-a-teacher-container-one">
            <h1>Hello ! Need a teacher ?</h1>
            <span className="need-a-teacher-span common-font-size">
              Salespro Direct takes less than 5 minutes to setup, allows you to work 10x as fast,
              and will increase sales from Day 1
            </span>
            <button type="button" className="btn-need-a-teacher b-radius-1000 d-flex aib jcc">
              <img src={NEEDATEACHERREGBTNSVG} alt="NEEDATEACHERREGBTNSVG" />
              Register
            </button>
          </div>
          <div className="w-40">
            <h1>Hello ! Need a teacher ?</h1>
            <span className="need-a-teacher-span">
              Salespro Direct takes less than 5 minutes to setup, allows you to work 10x as fast,
              and will increase sales from Day 1
            </span>
          </div>
        </div>
      </section>
      <section className="section-need-a-teacher-courses bg-transparent white-font">
        <div className="d-flex space-between aic">
          <h4>Courses</h4>
          {/* <H1 text="Courses" /> */}
          <div className="btn-filter d-flex jcc aic b-radius-1000 pointer">
            <span className="need-a-teacher-span">Filter</span>
            <img className="filter-courses-icon" src={FILTERICONSVG} alt="FILTERICONSVG" />
          </div>
        </div>
      </section>
      <section
        style={{ marginTop: '2%' }}
        className="section-need-a-teacher-courses bg-transparent white-font"
      >
        <div className="d-flex m-auto aic flex-wrap">
          <CoursesComponent />
        </div>
      </section>
    </header>
  );
}

export default Home;
