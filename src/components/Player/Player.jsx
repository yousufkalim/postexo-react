import React, { useRef, useEffect, useState } from 'react';
import Plyr from 'plyr-react';
import Legendary from '../../assets/Legendary.mp4';
import Popup from '../Dialog/Popup';

const PlyrProps = {
  type: 'video',
  title: 'Example title',
  sources: [
    {
      src: Legendary,
      // type: 'video/mp4',
      // provider: 'youtube',
    },
  ],
};
const controls = [
  // 'play-large', // The large play button in the center
  // 'restart', // Restart playback
  'rewind', // Rewind by the seek time (default 10 seconds)
  'play', // Play/pause playback
  'fast-forward', // Fast forward by the seek time (default 10 seconds)
  'progress', // The progress bar and scrubber for playback and buffering
  'current-time', // The current time of playback
  'duration', // The full duration of the media
  'mute', // Toggle mute
  'volume', // Volume control
  'captions', // Toggle captions
  // 'settings', // Settings menu
  // 'pip', // Picture-in-picture (currently Safari only)
  // 'airplay', // Airplay (currently Safari only)
  // 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
  'fullscreen', // Toggle fullscreen
];

const allOptions = {
  clickToPlay: false,
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
  controls,
  seekTime: 5,
  // mediaMetadata: {
  //   title: 'My new vdeo',
  //   artist: 'Nat King Cole',
  //   album: 'The Ultimate Collection (Remastered)',
  //   artwork: [{ src: 'https://dummyimage.com/96x96', sizes: '96x96', type: 'image/png' }],
  // },
};

function Player({ setOpenVideo, action, session }) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showPopup, setShowPopup] = useState(false);
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
        options={allOptions}
        // onClick={handleClick}
        // onPlaying={!showPopup}
      />
      <Popup open={open} setOpen={setOpen} setOpenVideo={setOpenVideo} />
    </>
  );
}

export default Player;
