/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Popup from '../Dialog/Popup';

function Player() {
  const [open, setOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const videoRef = useRef();

  useEffect(() => {
    if (play) {
      setTimeout(() => {
        setOpen(true);
        setShowPopup(true);
      }, 5000);
    }
  }, [play]);

  return (
    <>
      <Popup open={open} setOpen={setOpen} />

      <ReactPlayer
        width="100%"
        height="100%"
        onPlay={() => {
          if (!showPopup) {
            setPlay(true);
          }
        }}
        ref={videoRef}
        controls="true"
        playing={!showPopup}
        url="https://www.dailymotion.com/video/x85k8ga"
      />
    </>
  );
}

export default Player;
