import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import API from '../../api';
import CoursesComponent from '../Courses/CoursesComponent';

function Courses() {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const getSessions = async () => {
    try {
      const res = await API('get', `/sessions?pageSize=20&page=${page}`);
      setSessions((prev) => {
        if (prev?.length > 0) {
          return [...prev, ...res.data.sessions];
        }
        return res.data.sessions;
      });
      // setSessions(res.data.sessions);
      setHasMore(res?.data?.hasMore);
      // setSessions(res?.data?.sessions);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="course">
      <section className="section-need-a-teacher-courses">
        <div className="courses-div">
          <h4 className="courses_h4">{t('Courses')}</h4>
        </div>
      </section>
      <section className="section-need-a-teacher-courses2">
        <div className="courseComp-div">
          <CoursesComponent hasMore={hasMore} setPage={setPage} sessions={sessions} />
        </div>
      </section>
    </div>
  );
}

export default Courses;
