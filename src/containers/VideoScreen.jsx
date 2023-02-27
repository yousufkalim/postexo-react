import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Carousel } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
// import MoreVideos from '../components/Courses/MoreVideos';
import Navbar2 from '../components/HomeGrid/Navbar2';
import Screen from '../components/VideoScreen/VideoScreen';
import API from '../api';
// import Spinner from '../common/Spinner';
import { mediaUrl } from '../config';
import CategoriesLeft from '../components/HomeGrid/CategoriesLeft';

function VideoScreen() {
  const [currentVideo, setCurrentVideo] = useState();
  const [currentSession, setCurrentSession] = useState();
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
      let sortedData = data;
      if (data.chapters?.length > 0) {
        sortedData = {
          ...data,
          chapters: { ...data.chapters.sort((a, b) => a.startTime - b.startTime) },
        };
      }
      setCurrentVideo(sortedData);
    } catch (err) {
      toast.error(err.message);
    }
  };

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
          {currentSession?.photos?.length > 0 && (
            <div className="carousel_container">
              <Carousel autoplay className="more_carousel">
                {currentSession?.photos?.map((pic) => (
                  <div className="more_image_container">
                    {/* <h1>Test</h1> */}
                    <img src={pic} alt="test" />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          {/* <MoreVideos
            currentSession={currentSession}
            sessions={sessions?.filter(
              (session) =>
                session._id !== currentVideo?._id && session.matter === currentVideo?.matter,
            )}
          /> */}
        </div>
        {/* <div className="component-2">
          <CoursesComponent2 setCurrentVideo={setCurrentVideo} />
        </div> */}
      </div>
    </>
  );
}

export default VideoScreen;
