import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import GridIcon from '../../assets/GridIcon.svg';
import ViewIcon from '../../assets/ViewIcon.svg';
import WhiteGrid from '../../assets/WhiteGrid.svg';
import BlueList from '../../assets/BlueList.svg';
import CoursesComponent from '../Courses/CoursesComponent';
import CoursesComponent2 from '../Courses/CoursesComponentFullWidth';
import API from '../../api';
import Spinner from '../../common/Spinner';

const sortOptions = ['Sort By', 'Date', 'Most liked', 'Most viewed', 'Top rated'];

function CategoriesRight({ filters, sessions, setSessions }) {
  const { t } = useTranslation();
  const [showCours, setShowCoours] = useState(true);
  const [showCours2, setShowCoours2] = useState(true);
  const [topSessions, setTopSessions] = useState([]);
  const [viewedSessions, setViewedSessions] = useState([]);
  const [sortType, setSortType] = useState('');
  const [viewedSortType, setViewedSortType] = useState('');
  const [loading, setLoading] = useState(false);

  const getSessions = async () => {
    console.log('GEt sessions called');
    try {
      setLoading(true);
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API('get', `/sessions?levels=${levels}&durations=${durations}`).then((res) => {
        setSessions(res.data.sessions);
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  const getSetSessions = () => {
    if (sessions) {
      const response = sessions?.length > 0 ? [...sessions] : [];
      const response2 = sessions?.length > 0 ? [...sessions] : [];
      const topRated = response?.sort((a, b) => b.averageRating - a.averageRating);
      const mostViewed = response2?.sort((a, b) => b.views.length - a.views.length);
      setTopSessions(topRated);
      setViewedSessions(mostViewed);
    }
  };

  useEffect(() => {
    getSetSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);

  useEffect(() => {
    getSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.levels.length, filters.durations.length]);

  const handleSelectSort = (e) => {
    const { value } = e.target;
    setSortType(value);
    const sessionsCopy = [...topSessions];
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
      setTopSessions(topSessions);
    }
    setTopSessions(sessionsCopy);
  };

  const handleSelectSortViewed = (e) => {
    const { value } = e.target;
    setViewedSortType(value);
    const viewedSessionsCopy = [...viewedSessions];
    if (value === 'Date') {
      viewedSessionsCopy?.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else if (value === 'Most liked') {
      viewedSessionsCopy?.sort((a, b) => b.likes.length - a.likes.length);
    } else if (value === 'Most viewed') {
      viewedSessionsCopy?.sort((a, b) => b.views.length - a.views.length);
    } else if (value === 'Top rated') {
      viewedSessionsCopy?.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      setViewedSessions(viewedSessions);
    }
    setViewedSessions(viewedSessionsCopy);
  };

  const CourseEvent = () => {
    setShowCoours(true);
  };
  const Course2Event = () => {
    setShowCoours(false);
  };
  const CourseEvent2 = () => {
    setShowCoours2(true);
  };
  const Course2Event2 = () => {
    setShowCoours2(false);
  };

  return (
    <div className="category_right">
      {loading && <Spinner className="home_spinner" />}
      <div className="Salespro">
        <div className="TopCourses">
          <p className="TopCourses_title">{t('Top Courses')}</p>
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
      {showCours ? (
        <div className="topCoursesAll">
          <CoursesComponent sessions={topSessions} />
        </div>
      ) : (
        <div className="topCoursesAll">
          <CoursesComponent2 sessions={topSessions} />
        </div>
      )}

      {/* Courses 2  */}
      <div className="TopCourses">
        <p className="TopCourses_title">{t('Most Viewed')}</p>
        <div className="sortBy_div">
          <div className="sortby_main_div">
            <select
              onChange={handleSelectSortViewed}
              value={viewedSortType}
              className="sortby_select"
              id="Sort"
              name="Sort"
            >
              {sortOptions?.map((sortName) => (
                <option value={sortName} key={sortName} id={sortName}>
                  {t(sortName)}
                </option>
              ))}
            </select>
          </div>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={!showCours2 ? WhiteGrid : GridIcon}
            alt=""
            className="gridImage"
            onClick={() => CourseEvent2()}
            onKeyDown={CourseEvent}
          />
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={showCours2 ? ViewIcon : BlueList}
            alt=""
            className="ViewImage"
            onClick={() => Course2Event2()}
            onKeyDown={Course2Event}
          />
        </div>
      </div>
      {showCours2 ? (
        <div className="topCoursesAll">
          <CoursesComponent sessions={viewedSessions} />
        </div>
      ) : (
        <div className="topCoursesAll">
          <CoursesComponent2 sessions={viewedSessions} />
        </div>
      )}
    </div>
  );
}

export default CategoriesRight;
