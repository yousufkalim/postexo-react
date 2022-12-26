/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Player from '../Player/Player';
import ThumbsUp from '../../assets/ThumbsUp.svg';
import Like from '../../assets/like.png';
import ThumbsDown from '../../assets/ThumbsDown.svg';
import Favourite from '../../assets/Favourite.svg';
import Report from '../../assets/Report.svg';
import Watch from '../../assets/Watch.svg';
import Save from '../../assets/Save.svg';
import Options from '../../assets/Options.svg';
import Cross from '../../assets/Cross.svg';
import Add from '../../assets/Add.svg';
import API from '../../api';

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert('You clicked outside of me!');
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

function VideoScreen({ session, getCurrentVideo }) {
  // const navigate = useNavigate();

  console.log('SEssion ', session);
  const userInfo = localStorage.getItem('userData');
  const user = JSON.parse(userInfo);
  console.log('IUSER ', user);
  const isLiked = session?.likes?.find((item) => item === user?._id);
  const isDisliked = session?.dislikes?.find((item) => item === user?._id);

  const handleLikDislikeSession = async (action) => {
    await API('patch', `/sessions/${session._id}?${action}=true`, {
      userId: user?._id,
      flag: action === 'like' ? !isLiked : !isDisliked,
    })
      .then(() => {
        getCurrentVideo();
      })
      .catch(() => {});
  };
  /* or outside click */
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const [openOption, setOpenOption] = useState(false);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [openNewPlaylist, setOpenNewPlaylist] = useState(true);

  const handleOpenOption = () => {
    setOpenOption(true);
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
  const handleViewSession = async () => {
    console.log('VIEW SEssion ');
    await API('patch', `/sessions/${session._id}?view=true`, { userId: user?._id })
      .then(() => {
        getCurrentVideo();
      })
      .catch(() => {});
  };
  return (
    <div className="videoScreen_container">
      <div className="video_player">
        <Player session={session} action={handleViewSession} />
      </div>
      <div>
        <div className="video_title">
          <p className="time-date">
            {moment(session?.createdAt).format('hh:mm A dddd DD, MM YYYY')}
          </p>
          {/* <p className="time-date">7:30 PM Thursday 21, Apr 2022</p> */}
          <h1 className="title">{session?.subject}</h1>
        </div>
        <div className="social">
          <div className="nav_profile">
            <Avatar src="" className="profile_DP" />
            <div className="profile_details">
              <p className="Profile_names">{session?.professor_name}</p>
              <p className="Profile_mail">Senior Software Engineer</p>
            </div>
          </div>
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
            <div className="playlist-opt">
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
                      <div className="play-all">
                        <Checkbox color="default" sx={{ width: '0.9rem', color: '#FDFCFC' }} />
                        {
                          // eslint-disable-next-line
                          <label>UI/UX Courses</label>
                        }
                      </div>
                      <div className="play-all">
                        <Checkbox color="default" sx={{ width: '0.9rem', color: '#FDFCFC' }} />
                        {
                          // eslint-disable-next-line
                          <label>Watch later</label>
                        }
                      </div>
                      {openNewPlaylist ? (
                        <div className="new-playlist">
                          {
                            // eslint-disable-next-line
                            <img className="add" src={Add} alt="Report" onClick={handlePlaylist} />
                          }
                          Create new playlist
                        </div>
                      ) : (
                        <div className="create-play">
                          <p className="name-play">New Playlist Name</p>
                          <input className="inp" placeholder="Enter Playlist Name" type="text" />
                          <div className="create-div">
                            <p className="create">Create</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="options-box">
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
                      <div className="fav-div">
                        Add to Favourite
                        <img src={Favourite} alt="Favourite" />
                      </div>
                      <div className="fav-div">
                        Watch Later
                        <img src={Watch} alt="Favourite" />
                      </div>
                      <div className="fav-div">
                        Report
                        <img src={Report} alt="Favourite" />
                      </div>
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
        <div className="time-desc-box">
          <p className="time">19:12/20:22</p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ipsa sit, facere
          assumenda quasi consequuntur debitis voluptate corrupti aliquid iure ea eligendi incidunt
          rem in vero, placeat expedita. Magni, voluptatem?
          {/* {session?.comments?.map((comment) => (
            <div className="time-desc-content">
              <p className="time">
                {comment?.user?.name} / {moment(comment?.createdAt).format('hh:mm')}
              </p>
              <p className="time-para">{comment?.comment}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default VideoScreen;
