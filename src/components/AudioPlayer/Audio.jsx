import React, { useRef, useEffect, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import sample from '../../assets/sample.mp3';
import { Icon, Icon2, Icon3, Icon4, Icon5, Icon6 } from '../Icons';

function Audio({ viewSession }) {
  const audioRef = useRef();
  const [duration, setDuration] = useState(null);

  const chapter = [
    {
      name: 'chapter 1',
      start: 1,
      end: 4,
    },
    {
      name: 'chapter 2',
      start: 6,
      end: 9,
    },
    {
      name: 'chapter 3',
      start: 11,
      end: 12,
    },
  ];
  // const duration = audio.current?.audio?.current?.duration;

  useEffect(() => {
    if (audioRef.current?.audio?.current?.duration) {
      const audioDuration = audioRef?.current?.audio?.current?.duration;
      setDuration(audioDuration);
      audioRef.current.progressBar.current.addEventListener('mouseover', (e) =>
        console.log(e, 'event'),
      );
    }
  }, [audioRef?.current?.audio?.current?.duration]);

  return (
    <div>
      <AudioPlayer
        ref={audioRef}
        src={sample}
        onPlay={() => viewSession()}
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
              const leftStyle = (chap.end / duration) * 100;
              const widthStyle = ((chap.end - chap.start) / duration) * 100;
              console.table({ i, leftStyle, widthStyle, duration });
              return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={i} className="chapter" style={{ left: `${leftStyle}%` }}>
                  <div className="tooltip">
                    <span style={{ left: `${leftStyle}%` }} className="tooltiptext">
                      {chap.name}
                    </span>
                  </div>
                </span>
              );
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
