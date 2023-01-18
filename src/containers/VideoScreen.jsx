import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoreVideos from '../components/Courses/MoreVideos';
// import CoursesComponent2 from '../components/Courses/CoursesComponentFullWidth';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Screen from '../components/VideoScreen/VideoScreen';
import API from '../api';
import Spinner from '../common/Spinner';

function VideoScreen() {
  const [currentVideo, setCurrentVideo] = useState();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const getCurrentVideo = () => {
    setLoading(true);
    API('get', `/sessions/${params?.id}`)
      .then((res) => {
        setCurrentVideo(res?.data?.session);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.message);
      });
  };

  const getSessions = async () => {
    setLoading(true);
    try {
      await API('get', '/sessions').then((res) => {
        setSessions(res?.data?.sessions);
        // setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  useEffect(() => {
    getCurrentVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Navbar2 />
      <div className="adjustScreen">
        {loading && <Spinner className="video_spinner" />}
        <Screen getCurrentVideo={getCurrentVideo} session={currentVideo} />
        <div className="component-set">
          {/* <CoursesComponent /> */}
          <MoreVideos setLoading={setLoading} sessions={sessions} />
        </div>
        {/* <div className="component-2">
          <CoursesComponent2 setCurrentVideo={setCurrentVideo} />
        </div> */}
      </div>
    </>
  );
}

export default VideoScreen;
