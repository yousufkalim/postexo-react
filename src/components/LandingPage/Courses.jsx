import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../api';
import CoursesComponent from '../Courses/CoursesComponent';

function Courses() {
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
    <div className="course">
      <section className="section-need-a-teacher-courses">
        <div className="courses-div">
          <h4 className="courses_h4">Courses</h4>
        </div>
      </section>
      <section className="section-need-a-teacher-courses2">
        <div className="courseComp-div">
          <CoursesComponent sessions={sessions} />
        </div>
      </section>
    </div>
  );
}

export default Courses;
