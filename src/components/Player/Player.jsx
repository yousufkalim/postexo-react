import React from 'react';
import Plyr from 'plyr-react';

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
  return <Plyr source={PlyrProps} options={markerProps} />;
}

export default Player;
