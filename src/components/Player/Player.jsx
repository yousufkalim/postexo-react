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

const markerProps = {
  enabled: true,
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

function Player({ setOpenVideo }) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showPopup, setShowPopup] = React.useState(false);

  const videoRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    videoRef?.current?.plyr?.on('playing', (e) =>
      setTimeout(() => {
        setOpen(true);
        setShowPopup(true);
      }, 5000),
    );
  }, [videoRef]);

  return (
    <>
      <Plyr
        ref={videoRef}
        source={PlyrProps}
        options={markerProps}
        // onClick={handleClick}
        // onPlaying={!showPopup}
      />
      <Popup open={open} setOpen={setOpen} setOpenVideo={setOpenVideo} />
    </>
  );
}

export default Player;
