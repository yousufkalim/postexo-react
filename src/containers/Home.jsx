import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
import { Avatar } from 'antd';
import Navbar from '../common/Navbar';
import H1 from '../common/H1';
import Span from '../common/Span';
import Button from '../common/Button';
import Image from '../common/Image';
import NEEDATEACHERREGBTNSVG from '../assets/NEEDATEACHERREGBTN.svg';
import FILTERICONSVG from '../assets/FILTERICONSVG.svg';
import CoursesComponent from '../components/Courses/CoursesComponent';
import Teacher from '../assets/home/Teacher.svg';
import Pic1 from '../assets/home/Ellipse1.svg';
import Pic2 from '../assets/home/Ellipse2.svg';
import Pic3 from '../assets/home/Ellipse3.svg';

// eslint-disable-next-line no-shadow
function Home() {
  return (
    <header className="w-90 m-auto">
      <Navbar />
      <section className="section-need-a-teacher white-font">
        <div className="d-flex w-95 m-auto space-between">
          <div className="w-40 need-a-teacher-container-one">
            <H1 text="Hello ! Need a teacher ?" />
            <Span
              className="need-a-teacher-span common-font-size"
              text="Salespro Direct takes less than 5 minutes to setup, allows you to work 10x as fast, and will increase sales from Day 1"
            />
            <Button
              className="btn-need-a-teacher b-radius-1000 d-flex aib jcc"
              text="Register"
              src={NEEDATEACHERREGBTNSVG}
            />
          </div>
          <div className=" d-flex w-40 position-rel aie teacher">
            <Image src={Teacher} alt="teacher" className="w-100 position-abs" />
          </div>
        </div>
        <div className="d-flex flex-col aie jcc w-98">
          <div className="position-abs students-circle">
            <p>Postexo Students</p>
            <div>
              <Avatar.Group maxCount={3} maxStyle={{ backgroundColor: '#2B2926' }}>
                <Avatar
                  style={{
                    border: 'none',
                  }}
                  alt="Remy Sharp"
                  src={Pic1}
                />
                <Avatar
                  style={{
                    border: 'none',
                  }}
                  alt="Travis Howard"
                  src={Pic2}
                />
                <Avatar
                  style={{
                    border: 'none',
                  }}
                  alt="Cindy Baker"
                  src={Pic3}
                />
                <Avatar
                  style={{
                    border: 'none',
                  }}
                  alt="Cindy Baker"
                  src={Pic3}
                />
                <Avatar
                  style={{
                    border: 'none',
                  }}
                  alt="Cindy Baker"
                  src={Pic3}
                />
                <Avatar
                  style={{
                    border: 'none',
                  }}
                  alt="Cindy Baker"
                  src={Pic3}
                />
              </Avatar.Group>
            </div>
          </div>
        </div>
      </section>
      <section className="section-need-a-teacher-courses bg-transparent white-font">
        <div className="d-flex space-between aic">
          <h4>Courses</h4>
          {/* <H1 text="Courses" /> */}
          <div className="btn-filter d-flex jcc aic b-radius-1000 pointer">
            <Span className="need-a-teacher-span" text="Filter" />
            <Image className="filter-courses-icon" src={FILTERICONSVG} />
          </div>
        </div>
      </section>
      <section
        style={{ marginTop: '2%' }}
        className="section-need-a-teacher-courses bg-transparent white-font"
      >
        <div className="d-flex m-auto aic flex-wrap courses-div">
          <CoursesComponent />
        </div>
      </section>
    </header>
  );
}

export default Home;
