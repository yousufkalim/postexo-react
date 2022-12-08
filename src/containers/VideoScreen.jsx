import React from 'react';
import CoursesComponent from '../components/Courses/CoursesComponent';
import CoursesComponent2 from '../components/Courses/CoursesComponent2';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Screen from '../components/VideoScreen/VideoScreen';

function VideoScreen() {
  return (
    <>
      <Navbar2 />
      <div className="adjustScreen">
        <Screen />
        <div className="component-set">
          <CoursesComponent />
        </div>
        <div className="component-2">
          <CoursesComponent2 />
        </div>
      </div>
    </>
  );
}

export default VideoScreen;
