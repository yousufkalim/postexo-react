import React from 'react';
import { Avatar } from 'antd';
import NEEDATEACHERREGBTNSVG from '../../assets/NEEDATEACHERREGBTN.svg';
import Teacher from '../../assets/home/Teacher.svg';
import Pic1 from '../../assets/home/Ellipse1.svg';
import Pic2 from '../../assets/home/Ellipse2.svg';
import Pic3 from '../../assets/home/Ellipse3.svg';

function HomeSection() {
  return (
    <div className="homeSection">
      <section className="section-need-a-teacher">
        <div className="sectionAndTeacher">
          <div className="need-a-teacher-container-one">
            <h1 className="Need_teacher_title">Hello ! Need a teacher ?</h1>
            <span className="need-a-teacher-span">
              Salespro Direct takes less than 5 minutes to setup, allows you to work 10x as fast,
              and will increase sales from Day 1
            </span>
            <button type="button" className="btn-need-a-teacher">
              <div className="regbtnImgDiv">
                <img
                  src={NEEDATEACHERREGBTNSVG}
                  alt="NEEDATEACHERREGBTNSVG"
                  className="regbtnImg"
                  style={{ width: '100%' }}
                />
              </div>
              Register
            </button>
          </div>

          <div className="teacher">
            <img src={Teacher} alt="teacher" className="teacher-img" />
          </div>
        </div>
        <div className="postExo">
          <div className="students-circle">
            <p>Postexo Students</p>
            <div>
              <Avatar.Group
                maxCount={3}
                maxStyle={{ backgroundColor: '#2B2926' }}
                maxPopoverTrigger="click"
              >
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
    </div>
  );
}

export default HomeSection;
