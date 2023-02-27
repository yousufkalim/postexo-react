import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'antd';
import NEEDATEACHERREGBTNSVG from '../../assets/NEEDATEACHERREGBTN.svg';
import Teacher from '../../assets/home/Teacher.png';
import Pic1 from '../../assets/home/Ellipse1.svg';
import Pic2 from '../../assets/home/Ellipse2.svg';
import Pic3 from '../../assets/home/Ellipse3.svg';
import Popup from '../Dialog/Popup';

function HomeSection() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const registorForm = () => {
    setOpen(true);
  };
  return (
    <>
      <Popup open={open} setOpen={setOpen} />
      <div className="homeSection">
        <section className="section-need-a-teacher">
          <div className="sectionAndTeacher">
            <div className="need-a-teacher-container-one">
              <h1 className="Need_teacher_title">{t('Hello ! Need a teacher ?')}</h1>
              <span className="need-a-teacher-span">
                {t(
                  'After registering, you will be able to see the most popular courses of the platform, and benefit from them !',
                )}
              </span>
              <button type="button" className="btn-need-a-teacher" onClick={registorForm}>
                <div className="regbtnImgDiv">
                  <img
                    src={NEEDATEACHERREGBTNSVG}
                    alt="NEEDATEACHERREGBTNSVG"
                    className="regbtnImg"
                    style={{ width: '100%' }}
                  />
                </div>
                {t('Register')}
              </button>
            </div>

            <div className="teacher">
              <img src={Teacher} alt="teacher" className="teacher-img" />
            </div>
          </div>
          <div className="postExo">
            <div className="students-circle">
              <p>{t('Postexo Students')}</p>
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
    </>
  );
}

export default HomeSection;
