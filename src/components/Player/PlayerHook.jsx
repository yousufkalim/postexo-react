import React from 'react';
import { usePlyr } from 'plyr-react';

const PlyrVideo = React.forwardRef((props, ref) => {
  const { source, options = null, ...rest } = props;
  const raptorRef = usePlyr(ref, {
    source,
    options,
  });
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/media-has-caption
  return <video ref={raptorRef} className="plyr-react plyr" {...rest} />;
});

export default PlyrVideo;
