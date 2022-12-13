import React, { useState } from 'react';
import MoreVideos from '../components/Courses/MoreVideos';
import CoursesComponent2 from '../components/Courses/CoursesComponent2';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Screen from '../components/VideoScreen/VideoScreen';

function VideoScreen() {
  const [currentVideo, setCurrentVideo] = useState();

  console.log('Current ', currentVideo);
  return (
    <>
      <Navbar2 />
      <div className="adjustScreen">
        <Screen />
        <div className="component-set">
          {/* <CoursesComponent /> */}
          <MoreVideos setCurrentVideo={setCurrentVideo} />
        </div>
        <div className="component-2">
          <CoursesComponent2 setCurrentVideo={setCurrentVideo} />
        </div>
      </div>
    </>
  );
}

export default VideoScreen;
