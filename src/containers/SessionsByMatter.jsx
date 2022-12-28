import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Salespro from '../components/HomeGrid/Salespro';
import GridIcon from '../assets/GridIcon.svg';
import ViewIcon from '../assets/ViewIcon.svg';
import WhiteGrid from '../assets/WhiteGrid.svg';
import BlueList from '../assets/BlueList.svg';
import CoursesComponent from '../components/Courses/CoursesComponent';
import CoursesComponent2 from '../components/Courses/CoursesComponentFullWidth';
import API from '../api';

function SessionsByMatter() {
  const [showCours, setShowCoours] = useState(true);
  const [showCours2, setShowCoours2] = useState(true);
  const [sessions, setSessions] = useState([]);

  const { matterName } = useParams();

  const getSessions = async () => {
    try {
      await API('get', `/sessions/getByMatter?matterName=${matterName}`).then((res) => {
        console.log('Matter videos ', res);
        setSessions(res?.data?.sessions);
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log('All sessions ', sessions);

  useEffect(() => {
    getSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div>
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

export default SessionsByMatter;
