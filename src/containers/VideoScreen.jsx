import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoreVideos from '../components/Courses/MoreVideos';
import CoursesComponent2 from '../components/Courses/CoursesComponentFullWidth';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Screen from '../components/VideoScreen/VideoScreen';
import API from '../api';

function VideoScreen() {
  const [currentVideo, setCurrentVideo] = useState();
  const [sessions, setSessions] = useState([]);
  const params = useParams();

  const getCurrentVideo = () => {
    API('get', `/sessions/${params?.id}`)
      .then((res) => {
        setCurrentVideo(res?.data?.session);
      })
      .catch(() => {});
  };

  const getSessions = async () => {
    try {
      await API('get', '/sessions').then((res) => {
        setSessions(res?.data?.sessions);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentVideo();
    getSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Navbar2 />
      <div className="adjustScreen">
        <Screen getCurrentVideo={getCurrentVideo} session={currentVideo} />
        <div className="component-set">
          {/* <CoursesComponent /> */}
          <MoreVideos sessions={sessions} setCurrentVideo={setCurrentVideo} />
        </div>
        <div className="component-2">
          <CoursesComponent2 setCurrentVideo={setCurrentVideo} />
        </div>
      </div>
    </>
  );
}

export default VideoScreen;
