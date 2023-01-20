import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../api';
import FILTERICONSVG from '../../assets/FILTERICONSVG.svg';
import CoursesComponent from '../Courses/CoursesComponent';
// import Popup from '../Dialog/Popup';

function Courses() {
  // const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const [sessions, setSessions] = useState([]);

  const getSessions = async () => {
    try {
      const res = await API('get', '/sessions');
      setSessions(res?.data?.sessions);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <>
      {/* <Popup open={open} setOpen={setOpen} /> */}
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
            <CoursesComponent sessions={sessions} />
          </div>
        </section>
      </div>
    </>
  );
}

export default Courses;
