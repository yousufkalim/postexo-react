import React, { useRef, useEffect } from 'react';
import Plyr from 'plyr-react';
import Popup from '../Dialog/Popup';

const PlyrProps = {
  type: 'video',
  sources: [
    {
      src: 'yWtFb9LJs3o',
      provider: 'youtube',
    },
  ],
};

const click = {
  clickToPlay: false,
};
const markerProps = {
  markers: {
    enabled: true,
    points: [
      {
        time: 30, // marker point time
        label: 'first marker', // marker point hover display tip
      },
      {
        time: 75,
        label: 'second marker', // or you can custom marker hover tip by innerHTML
      },
    ],
  },
};

function Player({ setOpenVideo, action, session }) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showPopup, setShowPopup] = React.useState(false);
  const isLogin = localStorage.getItem('token');
  const videoRef = useRef();

  useEffect(() => {
    console.log(videoRef?.current?.plyr, 'videoref');
    // eslint-disable-next-line no-unused-vars

    if (!isLogin && videoRef?.current) {
      videoRef?.current?.plyr?.on('playing', () =>
        setTimeout(() => {
          setOpen(true);
          setShowPopup(true);
          videoRef?.current?.plyr.stop();
        }, 5000),
      );
    }
    if (isLogin && videoRef?.current && session) {
      videoRef?.current?.plyr?.on('playing', () =>
        setTimeout(() => {
          action();
        }, 1000),
      );
    }
  }, [videoRef, isLogin, action, session]);

  return (
    <>
      <Plyr
        ref={videoRef}
        source={PlyrProps}
        options={(markerProps, click)}
        // onClick={handleClick}
        // onPlaying={!showPopup}
      />
      <Popup open={open} setOpen={setOpen} setOpenVideo={setOpenVideo} />
    </>
  );
}

export default Player;
