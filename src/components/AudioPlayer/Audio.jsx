/* eslint-disable radix */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useRef, useEffect, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Spinner from '../../common/Spinner';
import data from '../../libs/exo_3565.json';
import { Icon, Icon2, Icon3, Icon4, Icon5, Icon6 } from '../Icons';

const addTime = 1 * 60 * 60 * 1000;

const d = new Date(data.exo.created_at_from_twilio);
const t = d.getTime() + addTime;

let currentStartTime = t + 14418769;

const FPS = 1_00;
const CANVAS_HEIGHT = 2800;
const CANVAS_WIDTH = 5050;

function Audio({ viewSession }) {
  const audioRef = useRef();
  const canvasRef = useRef(null);
  const [allPaths, setAllPaths] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [currTime, setCurrTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const [int, setInt] = useState();

  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const audioSrc = JSON.parse(data.exo.recording_audio)[0].replace('.mp3', '.wav');
    setAudio(audioSrc);
  }, []);

  const getStartTime = () => {
    const additionalTime = 1 * 60 * 60 * 1000;
    const startTime = new Date(data.exo.created_at_from_twilio);
    let time = startTime.getTime();
    time += additionalTime;
    return time;
  };

  const startTime = getStartTime() + 14418769;

  const handleCurrentTime = () => {
    const sTime = getStartTime() + 14418769;
    setCurrTime(sTime);
  };

  useEffect(() => {
    handleCurrentTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let interval;

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

  const formatPointColor = (val) => {
    switch (val) {
      case '[1.0, 1.0, 1.0, 1.0]':
        return '#ffffff'; // white
      case '[0.0, 0.0, 0.0, 1.0]':
        return '#000000'; // black
      case '[0.0, 0.0, 1.0, 1.0]':
        return '#0000ff'; // blue
      case '[0.0, 1.0, 0.0, 1.0]':
        return '#008000'; // green
      case '[1.0, 0.0, 0.0, 1.0]':
        return '#ff0000'; // red
      default:
        return '#000000';
    }
  };

  // draw a line
  const drawLine = (info, style = {}) => {
    const ctx = canvasRef?.current?.getContext('2d');

    const { x, y, x1, y1, key, key1 } = info;
    const { color = '#000000', width = 1 } = style;

    if (x1 === undefined) {
      return;
    }

    if (key !== key1) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);

    if (ctx.lineWidth !== width) {
      ctx.lineWidth = width;
    }

    if (ctx.strokeStyle !== color) {
      ctx.strokeStyle = color;
    }
    ctx.stroke();
  };

  useEffect(() => {
    if (audioRef.current?.audio?.current?.duration) {
      const audioDuration = audioRef?.current?.audio?.current?.duration;
      setDuration(audioDuration);
      audioRef.current.progressBar.current.addEventListener('mouseover', (e) =>
        console.log(e, 'event'),
      );
    }
  }, [audioRef?.current?.audio?.current?.duration]);

  useEffect(() => {
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height = CANVAS_HEIGHT;
    const paths = JSON.parse(data.exo.fb_data);
    const keys = Object.entries(paths.paths).map((item) => ({ ...item[1], key: item[0] }));

    const dates = [];
    keys.forEach((obj) => {
      obj.points?.forEach((item) => {
        dates.push(item.date);
      });
    });

    const sec = keys.map((obj) =>
      obj.points?.map((item) => ({
        color: formatPointColor(obj?.color),
        x: item.point.X,
        y: item.point.Y,
        date: item.date,
        width: obj.width,
        key: obj.key,
      })),
    );
    const first = sec.flat();
    setAllPaths(first);
    setAllDates(dates);
  }, [canvasRef]);

  const isDurationIncreased = (time) => {
    const playDuration = parseInt(time);
    return pauseTime === playDuration;
  };

  const displayContentAfterJump = (currentPlayedTime) => {
    setLoading(true);
    const newArr = [...allPaths];
    const startPaths = newArr.filter((item) => item.date < currentPlayedTime);
    for (let i = 0; i <= startPaths?.length; i++) {
      drawLine(
        {
          x: startPaths[i]?.x,
          y: startPaths[i]?.y,
          x1: startPaths[i + 1]?.x,
          y1: startPaths[i + 1]?.y,
          date: startPaths[i]?.date,
          date1: startPaths[i + 1]?.date,
          key: startPaths[i]?.key,
          key1: startPaths[i + 1]?.key,
        },
        { color: startPaths[i]?.color, width: startPaths[i]?.width },
      );
    }
    currentStartTime = currentPlayedTime;
    setLoading(false);
  };

  const setDataAfterPlay = (playedTime) => {
    const ctx = canvasRef?.current?.getContext('2d');
    const actualPlayedTime = playedTime * 1000;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const currentPlayedTime = startTime + actualPlayedTime;
    displayContentAfterJump(currentPlayedTime);
  };

  const handlePlay = (e) => {
    currentStartTime = parseInt(currTime);
    const isSame = isDurationIncreased(e?.srcElement?.currentTime);
    if (!isSame) {
      setDataAfterPlay(e.srcElement.currentTime);
    }
    const ctx = canvasRef?.current?.getContext('2d');

    if (ctx && allPaths?.length > 0 && currentStartTime) {
      ctx.fillStyle = '#ffffff';
      interval = setInterval(() => {
        currentStartTime = parseInt(currentStartTime);
        currentStartTime += FPS;
        const to = currentStartTime + FPS;
        let index;
        for (let i = currentStartTime; i <= to; i++) {
          index = allDates.indexOf(i);
          if (index !== -1) {
            drawLine(
              {
                x: allPaths[index]?.x,
                y: allPaths[index]?.y,
                x1: allPaths[index + 1]?.x,
                y1: allPaths[index + 1]?.y,
                date: allPaths[index]?.date,
                date1: allPaths[index + 1]?.date,
                key: allPaths[index]?.key,
                key1: allPaths[index + 1]?.key,
              },
              { color: allPaths[index]?.color, width: allPaths[index]?.width },
            );
          }
        }
      }, FPS);

      setInt(interval);
    }
    viewSession();
  };

  const handleJump = (e) => {
    const playTime = e.srcElement.currentTime;
    setDataAfterPlay(playTime);
  };

  const handlePause = (e) => {
    setPauseTime(parseInt(e.srcElement?.currentTime));
    setCurrTime(currentStartTime);
    clearInterval(int);
  };

  return (
    <div>
      <div style={{ height: '65vh', width: '99%', position: 'relative', marginBottom: '10px' }}>
        {loading && <Spinner />}
        <canvas
          style={{ height: '65vh', width: '99%', border: '1px solid #333', background: 'white' }}
          ref={canvasRef}
        />
      </div>
      <AudioPlayer
        ref={audioRef}
        src={audio}
        onPlay={(e) => handlePlay(e)}
        onPause={(e) => handlePause(e)}
        onSeeking={(e) => handleJump(e)}
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
              // const widthStyle = ((chap.end - chap.start) / duration) * 100;
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
