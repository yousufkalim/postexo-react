/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { usePlyr } from 'plyr-react';

const PlyrVideo = React.forwardRef((props, ref) => {
  const { source, options = null, ...rest } = props;

  const el = document.getElementById('test_video');

  el?.addEventListener('ready', (event) => {
    const player = event.detail.plyr;
    console.log('Player ', player);
  });

  const raptorRef = usePlyr(ref, {
    source,
    options,
  });
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/media-has-caption
  return (
    <video
      id="test_video"
      onPlayCapture={() => console.log('Cpaturw')}
      ref={raptorRef}
      onClick={() => console.log('Playing')}
      className="plyr-react plyr"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
});

export default PlyrVideo;
