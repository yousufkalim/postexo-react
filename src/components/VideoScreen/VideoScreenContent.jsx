import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Modal, Rate } from 'antd';
import ShowMoreText from 'react-show-more-text';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import API from '../../api';
import ThumbsUp from '../../assets/ThumbsUp.svg';
import Like from '../../assets/like.png';
import RateIcon from '../../assets/rating.png';
import ThumbsDown from '../../assets/ThumbsDown.svg';
import Favourite from '../../assets/Favourite.svg';
import Favorite from '../../assets/favorite.png';
import ReportImg from '../../assets/Report.svg';
import Watch from '../../assets/Watch.svg';
import Save from '../../assets/Save.svg';
import Options from '../../assets/Options.svg';
import Cross from '../../assets/Cross.svg';
import Add from '../../assets/Add.svg';

function VideoScreenContent({ session, getUserInfo, getCurrentVideo, userInfo, setOpenReport }) {
  const { t } = useTranslation();
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [openNewPlaylist, setOpenNewPlaylist] = useState(true);
  const [playlistName, setPlaylistName] = useState('');
  const [openOption, setOpenOption] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const menuRef = useRef();
  const favRef = useRef();

  const userData = JSON.parse(localStorage.getItem('userData'));

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
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('click', handleClickOutsideFav, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('click', handleClickOutsideFav, true);
    };
  }, [menuRef, favRef]);

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
        toast.success(t(res?.data?.message));
      })
      .catch((err) => toast.error(t(err?.message)));
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
      .catch((err) => toast.error(t(err?.message)));
  };

  const handleFavorite = async () => {
    await API('patch', `/sessions/favourites/${session?._id}`, { userId: userData?._id })
      .then((res) => {
        toast.success(t(res?.data?.data?.message));
        getUserInfo();
      })
      .catch((err) => toast.error(t(err?.message)));
  };

  const handleWatchLater = async () => {
    await API('patch', `/sessions/watchlater/${session?._id}`, { userId: userData?._id })
      .then((res) => {
        toast.success(t(res?.data?.data?.message));
        getUserInfo();
      })
      .catch((err) => toast.error(t(err?.message)));
  };

  const handleReport = () => {
    setOpenReport(true);
    setOpenOption(false);
  };

  const currentRating = session?.ratings?.find((item) => item.user === userInfo?._id);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRateSession = async () => {
    await API('patch', `/sessions/${session._id}?rate=true`, {
      userId: userData?._id,
      rating,
    })
      .then(() => {
        getCurrentVideo();
        handleCancel();
      })
      .catch(() => {});
  };

  return (
    <>
      <div>
        <div className="video_title">
          <p className="time-date">
            {moment(session?.created_at).format('hh:mm A dddd DD, MMM YYYY')}
          </p>
          {/* <p className="time-date">7:30 PM Thursday 21, Apr 2022</p> */}
          <div className="video_name">
            <h1 className="title">{session?.subject}</h1>
            {session?.student_level && <div className="video_level">{session?.student_level}</div>}
          </div>
        </div>
        <div className="social">
          <NavLink
            to={`/sessions/professor-sessions/${session?.professor_name}`}
            className="nav_profile"
          >
            <Avatar src="" className="profile_DP" />
            <div className="profile_details_video">
              <p className="Profile_names">{session?.professor_name}</p>
              <p className="Profile_mail">{t('Senior Software Engineer')}</p>
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
                {/* <div className="likes_views">{session?.dislikes?.length}</div> */}
              </div>
            </div>
            <div ref={menuRef} className="playlist-opt">
              <div className="playlist-div">
                <p className="playlist_p">{t('Add To Playlist')}</p>
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
                        {t('Add To Playlist')}
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
                            key={playlist._id}
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
                            <img className="add" src={Add} alt="Report" onClick={handlePlaylist} />
                          }
                          {t('Create new playlist')}
                        </div>
                      ) : (
                        <div className="create-play">
                          <p className="name-play">{t('New Playlist Name')}</p>
                          <input
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            className="inp"
                            placeholder={t('Enter Playlist Name')}
                            type="text"
                          />
                          <div className="create-div">
                            <button
                              disabled={!playlistName}
                              type="button"
                              onClick={() => handleCreatePlaylist()}
                              className={!playlistName ? 'create disabled' : 'create'}
                            >
                              {t('Create')}
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
                      <div role="presentation" onClick={() => handleFavorite()} className="fav-div">
                        {userInfo?.favorites?.find((item) => item?._id === session?._id)
                          ? t('Remove from favourite')
                          : t('Add to Favourite')}
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
                        {t('Watch Later')}
                        <img src={Watch} alt="Favourite" className="heart-img" />
                      </div>
                      <div role="presentation" onClick={showModal} className="fav-div">
                        {t('Give Rating')}
                        <img src={RateIcon} alt="Favourite" className="heart-img" />
                      </div>

                      <div className="fav-div" role="presentation" onClick={handleReport}>
                        {t('Report')}
                        <img src={ReportImg} alt="ReportImg" className="heart-img" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-box">
          <div className="description">{t('Description')}</div>
          <div className="description-para">
            <ShowMoreText
              lines={3}
              more={t('Show more')}
              less={t('Show less')}
              expanded={false}
              truncatedEndingComponent=" "
              className="content-css"
              anchorClass="show-more-less-clickable"
            >
              {session?.message}
            </ShowMoreText>
          </div>
        </div>
      </div>
      <Modal
        className="rating_modal"
        title={t('Rate this session')}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <Rate onChange={(value) => setRating(value)} value={rating || currentRating?.rating} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <button
            disabled={!rating}
            type="button"
            onClick={() => handleRateSession()}
            className={!rating ? 'create disabled' : 'create'}
          >
            {t('Submit')}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default VideoScreenContent;
