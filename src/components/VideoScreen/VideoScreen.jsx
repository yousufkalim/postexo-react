/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import Avatar from '@mui/material/Avatar';
import VideoPlayer from '../Player/VideoPlayer';
import ThumbsUp from '../../assets/ThumbsUp.svg';
import ThumbsDown from '../../assets/ThumbsDown.svg';
import Save from '../../assets/Save.svg';
import Options from '../../assets/Options.svg';
import API from '../../api/index';

function VideoScreen() {
  // const navigate = useNavigate();
  const [sesstion, setSession] = useState([]);
  console.log(sesstion, 'ddddd');
  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = async () => {
    try {
      await API('get', '/sessions').then((res) => {
        setSession(res?.data?.sessions);
        console.log(res?.data?.sessions);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="videoScreen_container">
      <div className="video_player">
        <VideoPlayer />
      </div>
      <div>
        <div className="video_title">
          <p className="time-date">7:30 PM Thursday 21, Apr 2022</p>
          <h1 className="title">How to Create a Useful & Excellent Optimized Section</h1>
        </div>
        <div className="social">
          <div className="nav_profile">
            <Avatar src="" className="profile_DP" />
            <div className="profile_details">
              <p className="Profile_names">Younus Akram</p>
              <p className="Profile_mail">Postexo@gmail.com</p>
            </div>
          </div>
          <div className="social-playlist">
            <div className="like-dislike-div">
              <div className="like-box">
                <div>
                  <img src={ThumbsUp} alt="likes" className="likes_img" />
                </div>
                <p className="likes_views">3.5k</p>
              </div>
              <div className="thumbDown-div">
                <img src={ThumbsDown} alt="dislike" className="dislike" />
                <p className="likes_views">{sesstion.dislikes}</p>
              </div>
            </div>
            <div className="playlist-opt">
              <div className="playlist-div">
                <p className="playlist_p">Add To Playlist</p>
                <div>
                  <img src={Save} alt="save to playlist" className="save-playlist" />
                </div>
              </div>
              <div className="options-box">
                <div className="options-div">
                  <img src={Options} alt="options" className="options" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-box">
          <h4 className="description">Discription</h4>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magLorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquipna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquipna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquipna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquipna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            </ShowMoreText>
          </p>
        </div>
        <div className="time-desc-box">
          <p className="time">10:31 / 38:20</p>
          <p className="time-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magLorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquipna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip aa...
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoScreen;
