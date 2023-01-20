import React, { useState, useRef, useEffect } from 'react';
import ShowMoreText from 'react-show-more-text';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import ThumbsUp from '../../assets/ThumbsUp.svg';
import Like from '../../assets/like.png';
import ThumbsDown from '../../assets/ThumbsDown.svg';
import Favourite from '../../assets/Favourite.svg';
import Favorite from '../../assets/favorite.png';
import ReportImg from '../../assets/Report.svg';
import Watch from '../../assets/Watch.svg';
import Save from '../../assets/Save.svg';
import Options from '../../assets/Options.svg';
import Cross from '../../assets/Cross.svg';
import Add from '../../assets/Add.svg';
import API from '../../api';
import UserInfo from '../../hoc/UserInfo';
import Audio from '../AudioPlayer/Audio';
import Report from '../Screen/Report';
// import Player from '../Player/Player';

function VideoScreenWrapped({ session, currentSession, getCurrentVideo, userInfo, getUserInfo }) {
  const [openOption, setOpenOption] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [openNewPlaylist, setOpenNewPlaylist] = useState(true);
  const [playlistName, setPlaylistName] = useState('');
  const [loading, setLoading] = useState(false);

  const menuRef = useRef();
  const favRef = useRef();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenPlaylist(false);
    }
  };

  const handleClickOutsideFav = (event) => {
    if (favRef.current && !favRef.current.contains(event.target)) {
      setOpenOption(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('click', handleClickOutsideFav, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('click', handleClickOutsideFav, true);
    };
  }, [menuRef, favRef]);

  const userData = JSON.parse(localStorage.getItem('userData'));
  const isLiked = session?.likes?.find((item) => item === userData?._id);
  const isDisliked = session?.dislikes?.find((item) => item === userData?._id);

  const handleLikDislikeSession = async (action) => {
    await API('patch', `/sessions/${session._id}?${action}=true`, {
      userId: userData?._id,
      flag: action === 'like' ? !isLiked : !isDisliked,
    })
      .then(() => {
        getCurrentVideo();
      })
      .catch(() => {});
  };

  const handleAddToPlaylist = async (id) => {
    await API('patch', `/playlist/${id}`, { sessionId: session?._id })
      .then((res) => {
        getUserInfo();
        toast.success(res?.data?.message);
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleOpenOption = () => {
    setOpenOption(!openOption);
  };
  const handleOpenPlaylist = () => {
    setOpenPlaylist(true);
  };
  const handlePlaylist = () => {
    setOpenNewPlaylist(false);
  };
  const handleClosePlaylist = () => {
    setOpenPlaylist(false);
    setOpenNewPlaylist(true);
  };

  const handleCreatePlaylist = async () => {
    API('post', '/playlist', { title: playlistName, userId: userData?._id })
      .then(() => {
        getUserInfo();
        setPlaylistName('');
        setOpenNewPlaylist(true);
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleFavorite = async () => {
    await API('patch', `/sessions/favourites/${session?._id}`, { userId: userData?._id })
      .then((res) => {
        toast.success(res?.data?.data?.message);
        getUserInfo();
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleWatchLater = async () => {
    await API('patch', `/sessions/watchlater/${session?._id}`, { userId: userData?._id })
      .then((res) => {
        toast.success(res?.data?.data?.message);
        getUserInfo();
      })
      .catch((err) => toast.error(err?.message));
  };
  const handleViewSession = async () => {
    await API('patch', `/sessions/${session._id}?view=true`, { userId: userData?._id })
      .then(() => {
        // getCurrentVideo();
      })
      .catch(() => {});
  };
  const handleReport = () => {
    setOpenReport(true);
    setOpenOption(false);
  };

  return (
    <>
      <Report
        sessionId={session?._id}
        userId={userData?._id}
        open={openReport}
        setOpen={setOpenReport}
      />
      <div className="videoScreen_container">
        <div className="video_player">
          {/* <Player session={session} action={handleViewSession} /> */}
          <Audio
            setLoading={setLoading}
            loading={loading}
            session={currentSession}
            viewSession={handleViewSession}
          />
        </div>
        <div>
          <div className="video_title">
            <p className="time-date">
              {moment(session?.createdAt).format('hh:mm A dddd DD, MMM YYYY')}
            </p>
            {/* <p className="time-date">7:30 PM Thursday 21, Apr 2022</p> */}
            <h1 className="title">{session?.subject}</h1>
          </div>
          <div className="social">
            <NavLink
              to={`/sessions/professor-sessions/${session?.professor_name}`}
              className="nav_profile"
            >
              <Avatar src="" className="profile_DP" />
              <div className="profile_details">
                <p className="Profile_names">{session?.professor_name}</p>
                <p className="Profile_mail">Senior Software Engineer</p>
              </div>
            </NavLink>
            <div className="social-playlist">
              <div className="like-dislike-div">
                <div
                  role="presentation"
                  onClick={() => handleLikDislikeSession('like')}
                  className={`like-box ${isLiked && 'like-box_active'}`}
                >
                  <div>
                    <img src={isLiked ? ThumbsUp : Like} alt="likes" className="likes_img" />
                  </div>
                  <p className="likes_views">{session?.likes?.length}</p>
                </div>
                <div
                  role="presentation"
                  onClick={() => handleLikDislikeSession('dislike')}
                  className={`${isDisliked && 'thumbDown-div_active'} thumbDown-div`}
                >
                  <img src={ThumbsDown} alt="dislike" className="dislike" />
                  <div className="likes_views">{session?.dislikes?.length}</div>
                </div>
              </div>
              <div ref={menuRef} className="playlist-opt">
                <div className="playlist-div">
                  <p className="playlist_p">Add To Playlist</p>
                  <div>
                    <div>
                      {
                        // eslint-disable-next-line
                        <img
                          src={Save}
                          alt="save to playlist"
                          className="save-playlist"
                          onClick={handleOpenPlaylist}
                        />
                      }
                    </div>
                    {openPlaylist && (
                      <div className="dropdown-playlist">
                        <div className="play-div">
                          Add To playlist
                          {
                            // eslint-disable-next-line
                            <img
                              className="cross"
                              src={Cross}
                              alt="Cross"
                              onClick={handleClosePlaylist}
                            />
                          }
                        </div>
                        {userInfo?.play_list?.map((playlist) => (
                          <div className="play-all">
                            <Checkbox
                              checked={playlist?.sessions?.find((item) => item === session?._id)}
                              onClick={() => handleAddToPlaylist(playlist?._id)}
                              color="default"
                              sx={{ width: '0.9rem', color: '#FDFCFC' }}
                            />
                            {
                              // eslint-disable-next-line
                              <label>{playlist?.title}</label>
                            }
                          </div>
                        ))}
                        {openNewPlaylist ? (
                          <div className="new-playlist">
                            {
                              // eslint-disable-next-line
                              <img
                                className="add"
                                src={Add}
                                alt="Report"
                                onClick={handlePlaylist}
                              />
                            }
                            Create new playlist
                          </div>
                        ) : (
                          <div className="create-play">
                            <p className="name-play">New Playlist Name</p>
                            <input
                              value={playlistName}
                              onChange={(e) => setPlaylistName(e.target.value)}
                              className="inp"
                              placeholder="Enter Playlist Name"
                              type="text"
                            />
                            <div className="create-div">
                              <button
                                disabled={!playlistName}
                                type="button"
                                onClick={() => handleCreatePlaylist()}
                                className={!playlistName ? 'create disabled' : 'create'}
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div ref={favRef} className="options-box">
                  <div className="options-div">
                    {
                      // eslint-disable-next-line
                      <img
                        src={Options}
                        alt="options"
                        className="options"
                        onClick={handleOpenOption}
                      />
                    }
                    {openOption && (
                      <div className="dropdown">
                        <div
                          role="presentation"
                          onClick={() => handleFavorite()}
                          className="fav-div"
                        >
                          {userInfo?.favorites?.find((item) => item?._id === session?._id)
                            ? 'Remove from favourite'
                            : 'Add to Favourite'}
                          <img
                            src={
                              userInfo?.favorites?.find((item) => item?._id === session?._id)
                                ? Favourite
                                : Favorite
                            }
                            className="heart-img"
                            alt="Favourite"
                          />
                        </div>
                        <div
                          role="presentation"
                          onClick={() => handleWatchLater()}
                          className="fav-div"
                        >
                          Watch Later
                          <img src={Watch} alt="Favourite" className="heart-img" />
                        </div>
                        {
                          // eslint-disable-next-line
                          <div className="fav-div" onClick={handleReport}>
                            Report
                            <img src={ReportImg} alt="ReportImg" className="heart-img" />
                          </div>
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="description-box">
            <h4 className="description">Description</h4>
            <p className="description-para">
              <ShowMoreText
                lines={3}
                more="Show more"
                less="Show less"
                expanded={false}
                truncatedEndingComponent=" "
                className="content-css"
                anchorClass="show-more-less-clickable"
              >
                {session?.message}
              </ShowMoreText>
            </p>
          </div>
          {/* <div className="time-desc-box">
            <p className="time">19:12/20:22</p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsa sit, facere
            assumenda quasi consequuntur debitis voluptate corrupti aliquid iure ea eligendi
            incidunt rem in vero, placeat expedita. Magni, voluptatem?
            {session?.comments?.map((comment) => (
            <div className="time-desc-content">
              <p className="time">
                {comment?.user?.name} / {moment(comment?.createdAt).format('hh:mm')}
              </p>
              <p className="time-para">{comment?.comment}</p>
            </div>
          ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

const VideoScreen = UserInfo(VideoScreenWrapped);
export default VideoScreen;
