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

function Player() {
  const [open, setOpen] = React.useState(true);

  const videoRef = useRef();

  const handleClick = () => {
    console.log('Clicked ');
    setOpen(true);
  };

  useEffect(() => {
    const isPaused = videoRef?.current?.plyr?.media?.paused;
    console.log('VIDEO ', videoRef);
    console.log('VIDEO ', isPaused);
    // if (!isPaused) {
    //   setTimeout(() => {
    //     setOpen(true);
    //   }, 5000);
    // }
  }, [videoRef?.current?.plyr?.elements?.progress]);

  return (
    <>
      <Popup open={open} setOpen={setOpen} />
      <Plyr ref={videoRef} source={PlyrProps} options={markerProps} onClick={handleClick} />
    </>
  );
}

export default Player;
