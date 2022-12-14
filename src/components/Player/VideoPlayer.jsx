/* eslint-disable no-unneeded-ternary */
import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer() {
  return (
    <ReactPlayer
      width="100%"
      height="100%"
      controls="true"
      url="https://www.dailymotion.com/video/x85k8ga"
    />
  );
}

export default VideoPlayer;
