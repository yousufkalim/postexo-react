/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef } from 'react';

function PlayerNew() {
  const vidRef = useRef();
  //   useEffect(() => {
  //     if (vidRef) {
  //       //   const myVid = document.getElementsByClassName('postexo_video');
  //       const tracks = vidRef?.current?.textTracks();

  //       for (let i = 0; i < tracks.length; i++) {
  //         const track = tracks[i];

  //         // Find the English captions track and mark it as "showing".
  //         if (track.kind === 'captions' && track.language === 'en') {
  //           track.mode = 'showing';
  //         }
  //       }
  //       console.log('My video ', myVid);
  //       // const text1 = myVid?.addTextTrack('captions');
  //       // text1.addCue(new TextTrackCue('Test text', 1, 4, '', '', '', true));
  //     }
  //   }, [vidRef]);
  return (
    <div>
      <video
        poster="https://media.istockphoto.com/id/1386446426/photo/badshahi-mosque.jpg?b=1&s=170667a&w=0&k=20&c=WoaPQg1KJG8Qj4oDWspKS1wOSWK3RJWa62GDjvnDmj0="
        width="100%"
        height="700"
        ref={vidRef}
        className="postexo_video"
        muted
        controls
        preload="auto"
        type="video/mp4"
        disablePictureInPicture
        playsInline
        addTextTrack={(e) => console.log('Add test ', e)}
        onPlaying={() => console.log('Playing video')}
        onProgress={(e) => console.log('Progress ', e)}
        src="https://media.geeksforgeeks.org/wp-content/uploads/20190616234019/Canvas.move_.mp4"
      />
      {/* <source type="video/mp4" /> */}
      {/* <source
          src="https://media.geeksforgeeks.org/wp-content/uploads/20190616234019/Canvas.move_.ogg"
          type="video/ogg"
        /> */}
    </div>
  );
}

export default PlayerNew;
