import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GridIcon from '../../assets/GridIcon.svg';
import ViewIcon from '../../assets/ViewIcon.svg';
import WhiteGrid from '../../assets/WhiteGrid.svg';
import BlueList from '../../assets/BlueList.svg';
import CoursesComponent from '../Courses/CoursesComponent';
import CoursesComponent2 from '../Courses/CoursesComponentFullWidth';
import NoDataFound from '../../common/NoDataFound';

const sortOptions = ['Sort By', 'Date', 'Most liked', 'Most viewed', 'Top rated'];

function SessionsContent({
  title,
  sessions,
  getSessions,
  filters,
  mutator,
  setSessions,
  loading,
  setPage,
  page,
  hasMore,
}) {
  const { t } = useTranslation();
  const [showCours, setShowCoours] = useState(true);
  const [allSessions, setAllSessions] = useState([]);
  const [sortType, setSortType] = useState('');

  const CourseEvent = () => {
    setShowCoours(true);
  };
  const Course2Event = () => {
    setShowCoours(false);
  };

  const handleSelectSort = (e) => {
    const { value } = e.target;
    setSortType(value);
    const sessionsCopy = [...allSessions];
    if (value === 'Date') {
      sessionsCopy?.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else if (value === 'Most liked') {
      sessionsCopy?.sort((a, b) => b.likes.length - a.likes.length);
    } else if (value === 'Most viewed') {
      sessionsCopy?.sort((a, b) => b.views.length - a.views.length);
    } else if (value === 'Top rated') {
      sessionsCopy?.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      setAllSessions(sessions);
    }
    setAllSessions(sessionsCopy);
  };

  useEffect(() => {
    return () => {
      setSessions([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllSessions(sessions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);

  useEffect(() => {
    getSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.levels.length, filters.durations.length, mutator, page]);

  return (
    <>
      <div className="Salespro">
        {/* Courses  */}
        <div className="TopCourses">
          <p className="TopCourses_title">{title}</p>
          <div className="sortBy_div">
            <div className="sortby_main_div">
              <select
                onChange={handleSelectSort}
                value={sortType}
                className="sortby_select"
                id="Sort"
                name="Sort"
              >
                {sortOptions?.map((sortName) => (
                  <option key={sortName} value={sortName} id={sortName}>
                    {t(sortName)}
                  </option>
                ))}
              </select>
            </div>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={!showCours ? WhiteGrid : GridIcon}
              alt=""
              className="gridImage"
              onClick={() => CourseEvent()}
              onKeyDown={CourseEvent}
            />
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={showCours ? ViewIcon : BlueList}
              alt=""
              className="ViewImage"
              onClick={() => Course2Event()}
              onKeyDown={Course2Event}
            />
          </div>
        </div>
      </div>
      <NoDataFound loading={loading} data={sessions}>
        {showCours ? (
          <CoursesComponent hasMore={hasMore} setPage={setPage} sessions={allSessions} />
        ) : (
          <div className="topCoursesAll">
            <CoursesComponent2 sessions={allSessions} />
          </div>
        )}
      </NoDataFound>
    </>
  );
}

export default SessionsContent;
