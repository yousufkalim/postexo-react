import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Salespro from './Salespro';
import GridIcon from '../../assets/GridIcon.svg';
import ViewIcon from '../../assets/ViewIcon.svg';
import WhiteGrid from '../../assets/WhiteGrid.svg';
import BlueList from '../../assets/BlueList.svg';
import CoursesComponent from '../Courses/CoursesComponent';
import CoursesComponent2 from '../Courses/CoursesComponentFullWidth';
import API from '../../api';
import Spinner from '../../common/Spinner';

function CategoriesRight({ filters }) {
  const [showCours, setShowCoours] = useState(true);
  const [showCours2, setShowCoours2] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSessions = async () => {
    try {
      setLoading(true);
      const allLevels = [...filters.levels];
      const allDurations = [...filters.durations];
      const levels = filters?.levels?.length ? allLevels.toString() : filters?.levels;
      const durations = filters?.durations?.length ? allDurations.toString() : filters?.durations;
      await API('get', `/sessions?levels=${levels}&durations=${durations}`).then((res) => {
        setSessions(res?.data?.sessions);
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
        <Salespro />
        {/* Courses  */}
        <div className="TopCourses">
          <p className="TopCourses_title">Top Courses</p>
          <div className="sortBy_div">
            <div className="sortby_main_div">
              <select className="sortby_select" id="Sort" name="Sort">
                <option className="selectr_option" value="volvo">
                  Sort by
                </option>
                <option className="selectr_option" value="saab">
                  Sort by
                </option>
                <option className="selectr_option" value="mercedes">
                  Sort by
                </option>
                <option className="selectr_option" value="audi">
                  Sort by
                </option>
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
          <CoursesComponent sessions={sessions} />
        </div>
      ) : (
        <div className="topCoursesAll">
          <CoursesComponent2 sessions={sessions} />
        </div>
      )}

      {/* Courses 2  */}
      <div className="TopCourses">
        <p className="TopCourses_title">Most Viewed</p>
        <div className="sortBy_div">
          <div className="sortby_main_div">
            <select className="sortby_select" id="Sort" name="Sort">
              <option className="selectr_option" value="volvo">
                Sort by
              </option>
              <option className="selectr_option" value="saab">
                Sort by
              </option>
              <option className="selectr_option" value="mercedes">
                Sort by
              </option>
              <option className="selectr_option" value="audi">
                Sort by
              </option>
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
          <CoursesComponent sessions={sessions} />
        </div>
      ) : (
        <div className="topCoursesAll">
          <CoursesComponent2 sessions={sessions} />
        </div>
      )}
    </div>
  );
}

export default CategoriesRight;
