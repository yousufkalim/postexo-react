import React, { useRef, useEffect, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import sample from '../../assets/sample.mp3';
import { Icon, Icon2, Icon3, Icon4, Icon5, Icon6 } from '../Icons';

function Audio() {
  const audioRef = useRef();
  const [duration, setDuration] = useState(null);

  const chapter = [
    {
      start: 0,
      end: 4,
    },
    {
      start: 6,
      end: 10,
    },
  ];
  // const duration = audio.current?.audio?.current?.duration;

  useEffect(() => {
    if (audioRef.current?.audio?.current?.duration) {
      console.log('Ref duration===> ', audioRef.current?.audio?.current?.duration);
      const audioDuration = audioRef?.current?.audio?.current?.duration;
      setDuration(audioDuration);
    }
  }, [audioRef?.current?.audio?.current?.duration]);

  console.log('Update Duration ', duration);
  console.log('Update Ref ', audioRef);

  return (
    <div>
      <AudioPlayer
        ref={audioRef}
        src={sample}
        layout="horizontal-reverse"
        progressJumpSteps={{
          forward: 5000,
          backward: 5000,
        }}
        customIcons={{
          forward: <Icon />,
          pause: <Icon2 />,
          play: <Icon3 />,
          rewind: <Icon4 />,
          volume: <Icon5 />,
          volumeMute: <Icon6 />,
        }}
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR,
          <div className="chapter-div">
            {chapter.map((chap, i) => {
              console.log('Start ', typeof chap?.start);
              console.log('Start  type', chap?.start);
              console.log('Duration ', duration);
              console.log('Duration typeof ', typeof duration);
              const leftStyle = (chap.end / duration) * 100;
              const widthStyle = ((chap.end - chap.start) / duration) * 100;
              console.table({ i, leftStyle, widthStyle, duration });
              return <span className="chapter" style={{ left: `${leftStyle}%` }} />;
            })}
          </div>,
          RHAP_UI.CURRENT_TIME,
          <div className="slash">&nbsp;/&nbsp;</div>,
          RHAP_UI.DURATION,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
      />
    </div>
  );
}

export default Audio;
