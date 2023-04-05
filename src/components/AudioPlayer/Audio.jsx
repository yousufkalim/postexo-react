import React, { useRef, useEffect, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Spin } from 'antd';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'react-h5-audio-player/lib/styles.css';
import FullScreenIcon from '../../assets/fullscreen.png';
import ExitScreen from '../../assets/minimize.png';
import { Icon, Icon2, Icon3, Icon4, Icon5, Icon6 } from '../Icons';
import api from '../../api';

// const chapter = [
//   {
//     name: 'Chapter 1: How to learn ReactJS? | How to start ReactJS?',
//     start: 0,
//     end: 60,
//   },
//   {
//     name: 'Chapter 2 : Advanced javascript',
//     start: 1000,
//     end: 2000,
//   },
//   {
//     name: 'chapter 3',
//     start: 2100,
//     end: 3000,
//   },
// ];

// const addTime = 1 * 60 * 60 * 1000;

// const date = new Date(data.exo.created_at_from_twilio);
// const audioStartTime = date.getTime() + addTime;

let currentStartTime = 0;

const FPS = 1_00;
const CANVAS_HEIGHT = 2800;
const CANVAS_WIDTH = 5050;

const Audio = React.memo(({ session }) => {
  const audioRef = useRef();
  const canvasRef = useRef(null);
  const [allPaths, setAllPaths] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [currTime, setCurrTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [int, setInt] = useState();
  const [duration, setDuration] = useState(null);
  const [jumped, setJumped] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [tooltipOffset, setTooltipOffset] = useState(0);

  const handle = useFullScreenHandle();

  const userData = JSON.parse(localStorage.getItem('userData'));

  let interval;

  const getStartTime = () => {
    // const additionalTime = 1 * 60 * 60 * 1000;
    const sTime = new Date(session?.created_at_from_twilio);
    const time = sTime.getTime();
    // time += additionalTime;
    return time;
  };

  const handleViewSession = async () => {
    await api('patch', `/sessions/${session._id}?view=true`, { userId: userData?._id })
      .then(() => {
        // getCurrentVideo();
      })
      .catch(() => {});
  };

  const handleCurrentTime = () => {
    const sTime = getStartTime();
    setCurrTime(sTime);
    setStartTime(sTime);
    currentStartTime = sTime;
  };

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

  const setFormattedData = () => {
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height = CANVAS_HEIGHT;
    if (session?.fb_data) {
      try {
        const fbData = session?.fb_data;
        const keys = Object.entries(fbData.paths).map((item) => ({ ...item[1], key: item[0] }));

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
      } catch (err) {
        console.log('Response Error ', err);
      }
    }
    setLoading(false);
  };

  const setInitialData = () => {
    const audioSrc = session.session_recording.replace('.mp3', '.wav');
    setAudio(audioSrc);
    handleCurrentTime();
    setFormattedData();
  };

  useEffect(() => {
    const element = document.getElementsByClassName('rhap_progress-bar');

    element[0].addEventListener('mousemove', (event) => {
      const addOffset = event?.target?.className.includes('rhap_download-progress')
        ? event?.target?.offsetLeft
        : 0;

      const element2 = document.getElementsByClassName('rhap_container');
      const width = element[0].clientWidth;
      const offSetX = addOffset ? addOffset + event.offsetX : event.offsetX;
      const totalOffset = offSetX;
      setTooltipOffset(totalOffset);
      // eslint-disable-next-line react-hooks/exhaustive-deps

      const audioDuration = parseInt(element2?.[0]?.firstChild?.duration, 10);
      const elementPosition = (offSetX / width) * 100;
      const audioTime = (audioDuration / 100) * elementPosition;
      setCurrentAudioTime(audioTime);
    });

    element[0].addEventListener('mouseleave', () => {
      setCurrentAudioTime(0);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (session) {
      setInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
    }
    document.getElementsByClassName('rhap_forward-button')?.[0].addEventListener('click', () => {
      setJumped(true);
    });
    document.getElementsByClassName('rhap_rewind-button')?.[0].addEventListener('click', () => {
      setJumped(true);
    });
  }, [audioRef?.current?.audio?.current?.duration]);

  const isDurationIncreased = (time) => {
    const playDuration = parseInt(time, 10);
    return pauseTime === playDuration;
  };

  const displayContentAfterJump = (currentPlayedTime) => {
    const newArr = [...allPaths];
    const startPaths = newArr.filter(
      (item) => item?.date < currentPlayedTime && item.date >= startTime,
    );

    console.log('Start paths ', startPaths);
    console.log('Start time ', startTime);
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
    // setTimeout(() => {
    //   setLoading(false);
    // }, 0);
    currentStartTime = currentPlayedTime;
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1500);
  };

  const setDataAfterPlay = async (playedTime) => {
    setLoading(true);
    const ctx = canvasRef?.current?.getContext('2d');
    const actualPlayedTime = playedTime * 1000;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const currentPlayedTime = parseInt(startTime + actualPlayedTime, 10);
    displayContentAfterJump(currentPlayedTime);
  };

  const handlePlay = (e) => {
    currentStartTime = parseInt(currTime, 10);
    const isSame = isDurationIncreased(e?.srcElement?.currentTime);
    if (!isSame) {
      setDataAfterPlay(e.srcElement.currentTime);
    }
    const ctx = canvasRef?.current?.getContext('2d');
    // setLoading(false);
    if (ctx && allPaths?.length > 0 && currentStartTime) {
      const endTime = startTime + e.srcElement.duration * 1000;
      ctx.fillStyle = '#ffffff';
      interval = setInterval(() => {
        currentStartTime = parseInt(currentStartTime, 10);
        currentStartTime += FPS;
        const to = currentStartTime + FPS;
        for (let i = currentStartTime; i <= to; i++) {
          const matchedIndexes = [];
          allDates.forEach((item, ind) => {
            if (item === i) {
              matchedIndexes.push(ind);
            }
          });
          if (matchedIndexes?.length > 0) {
            matchedIndexes.forEach((item) => {
              drawLine(
                {
                  x: allPaths[item]?.x,
                  y: allPaths[item]?.y,
                  x1: allPaths[item + 1]?.x,
                  y1: allPaths[item + 1]?.y,
                  date: allPaths[item]?.date,
                  date1: allPaths[item + 1]?.date,
                  key: allPaths[item]?.key,
                  key1: allPaths[item + 1]?.key,
                },
                { color: allPaths[item]?.color, width: allPaths[item]?.width },
              );
            });
          }
          if (currentStartTime <= endTime) {
            clearInterval(int);
          }
        }
      }, FPS);

      setInt(interval);
    }
  };

  const handleJump = async (e) => {
    if (!jumped) {
      setLoading(true);
      const playTime = e.srcElement.currentTime;
      await setDataAfterPlay(playTime);
    }
    setJumped(false);
  };

  const handlePause = (e) => {
    setPauseTime(parseInt(e.srcElement?.currentTime, 10));
    setCurrTime(currentStartTime);
    clearInterval(int);
  };

  const handleListen = () => {
    if (loading) {
      setLoading(false);
    }
  };

  const wheel = {
    wheelDisabled: true,
  };

  const doubleClick = {
    disabled: true,
  };

  const zoomAnimation = {
    disabled: true,
  };

  const handleLoadStart = () => {
    setLoading(false);
    audioRef.current.audio.current.play();
    setTimeout(() => {
      handleViewSession();
    }, 5000);
  };

  return (
    <div>
      <FullScreen handle={handle}>
        {loading && (
          <div
            style={{
              height: handle?.active ? '100vh' : '75vh',
              background: handle?.active && 'rgba(0, 0, 0, 0.2)',
              width: handle?.active ? '100%' : '80%',
            }}
            className="spinner_container"
          >
            <div className="spinner_inner">
              <Spin size="large" className="spinner" />
            </div>
          </div>
        )}
        <TransformWrapper zoomAnimation={zoomAnimation} wheel={wheel} doubleClick={doubleClick}>
          <TransformComponent>
            <div
              className="video_canvas"
              style={{
                cursor: 'zoom-in',
                height: `${handle.active ? '93vh' : '65vh'}`,
                width: '100%',
                position: 'relative',
                marginBottom: '10px',
              }}
            >
              <canvas
                className="video_canvas"
                style={{
                  height: `${handle.active ? '93vh' : '65vh'}`,
                  width: '100%',
                  border: '1px solid #333',
                  borderRadius: '20px',
                  background: 'white',
                }}
                ref={canvasRef}
              />
              {!handle.active && (
                <img
                  onClick={handle.enter}
                  role="presentation"
                  src={FullScreenIcon}
                  alt="full-screen"
                  className="full_screen_icon"
                />
              )}
              {handle.active && (
                <img
                  onClick={handle.exit}
                  role="presentation"
                  src={ExitScreen}
                  alt="exit-full-screen"
                  className="full_screen_icon"
                />
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
        <AudioPlayer
          ref={audioRef}
          src={audio}
          onPlay={handlePlay}
          onListen={handleListen}
          autoPlayAfterSrcChange={false}
          autoPlay={false}
          onLoadedData={handleLoadStart}
          onPause={handlePause}
          onSeeking={handleJump}
          layout="horizontal-reverse"
          progressJumpSteps={{
            forward: 1000,
            backward: 1000,
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
              <div className="chapter_div_wrapper">
                {session?.chapters?.map((chap, i) => {
                  const leftStyle = (chap.startTime / duration) * 100;
                  let findTooltip;
                  const chaptersCopy = [...session.chapters];
                  if (i === chaptersCopy.length - 1) {
                    if (currentAudioTime > chap.startTime) {
                      findTooltip = chap;
                    }
                  } else if (
                    currentAudioTime > chap.startTime &&
                    chaptersCopy?.[i + 1]?.startTime > currentAudioTime
                  ) {
                    findTooltip = chap;
                  }
                  let index = -1;
                  index = session?.chapters.findIndex(({ name }) => name === findTooltip?.name);
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <>
                      {i !== 0 && <span className="chapter" style={{ left: `${leftStyle}%` }} />}
                      <div className="tooltip">
                        {findTooltip && currentAudioTime && (
                          <span
                            style={{
                              left: `${tooltipOffset}px`,
                              display: i === index ? 'block' : 'none',
                            }}
                            className="tooltiptext"
                          >
                            {chap.name}
                          </span>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>,
            RHAP_UI.CURRENT_TIME,
            <div className="slash">&nbsp;/&nbsp;</div>,
            RHAP_UI.DURATION,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        />
      </FullScreen>
      {/* <button type="button" onClick={handle.enter}>
        Enter fullscreen
      </button> */}
    </div>
  );
});

export default Audio;
