import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import MoreVideos from '../components/Courses/MoreVideos';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Screen from '../components/VideoScreen/VideoScreen';
import API from '../api';
// import Spinner from '../common/Spinner';
import { mediaUrl } from '../config';
import CategoriesLeft from '../components/HomeGrid/CategoriesLeft';

function VideoScreen() {
  const [currentVideo, setCurrentVideo] = useState();
  const [currentSession, setCurrentSession] = useState();
  const [sessions, setSessions] = useState([]);
  const [filters, setFilters] = useState({ levels: [], durations: [], languages: [] });
  const [rerender, setRerender] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const params = useParams();

  const openNavMenu = () => {
    setShowMenu(!showMenu);
  };

  const getCurrentSession = async () => {
    try {
      const res = await API('get', `/sessions/${params?.id}`);
      const data = res?.data?.session;
      const fbData = `${mediaUrl}/${data?.fb_data}`;
      try {
        const resp = await fetch(fbData);
        const response = await resp?.json();
        data.fb_data = response?.exo?.fb_data;
      } catch (err) {
        data.fb_data = '';
      }
      if (!rerender) {
        setCurrentSession(data);
        setRerender(true);
      }
      setCurrentVideo(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getSessions = async () => {
    try {
      await API('get', '/sessions').then((res) => {
        setSessions(res?.data?.sessions);
        // setLoading(false);
      });
    } catch (err) {
      // setLoading(false);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCurrentSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Navbar2 openNavMenu={openNavMenu} />
      <div
        className={`categories_menu ${showMenu ? 'Categories_column' : 'Categories_columnActive'}`}
      >
        <CloseIcon className="closeIcon" onClick={openNavMenu} />
        <CategoriesLeft setFilters={setFilters} filters={filters} />
      </div>
      <div className="adjustScreen">
        {/* {loading && <Spinner className="video_spinner" />} */}
        <Screen
          currentSession={currentSession}
          setCurrentVideo={setCurrentVideo}
          getCurrentVideo={getCurrentSession}
          session={currentVideo}
        />
        <div className="component-set">
          {/* <CoursesComponent /> */}
          <MoreVideos
            currentSession={currentSession}
            // setLoading={setLoading}
            sessions={sessions?.filter(
              (session) =>
                session._id !== currentVideo?._id && session.matter === currentVideo?.matter,
            )}
          />
        </div>
        {/* <div className="component-2">
          <CoursesComponent2 setCurrentVideo={setCurrentVideo} />
        </div> */}
      </div>
    </>
  );
}

export default VideoScreen;
