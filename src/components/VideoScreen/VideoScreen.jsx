import React, { useState, useEffect } from 'react';
import API from '../../api';
import Audio from '../AudioPlayer/Audio';
import Report from '../Screen/Report';
import VideoScreenContent from './VideoScreenContent';

function VideoScreen({ session, currentSession, getCurrentVideo }) {
  const [userInfo, setUserInfo] = useState({});
  const [openReport, setOpenReport] = useState(false);

  const userData = JSON.parse(localStorage.getItem('userData'));

  const getUserInfo = async () => {
    await API('get', `/users/${userData?._id}`)
      .then((res) => {
        setUserInfo(res?.data?.user);
      })
      .catch((err) => console.log('USER INFORMATION ====> ERROR ==> ', err));
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Report
        sessionId={session?._id}
        userId={userData?._id}
        open={openReport}
        setOpen={setOpenReport}
      />
      <div className="videoScreen_container">
        <div className="video_player">
          <Audio session={currentSession} />
        </div>
        <VideoScreenContent
          getCurrentVideo={getCurrentVideo}
          setOpenReport={setOpenReport}
          userInfo={userInfo}
          session={session}
          getUserInfo={getUserInfo}
        />
      </div>
    </>
  );
}
export default VideoScreen;
