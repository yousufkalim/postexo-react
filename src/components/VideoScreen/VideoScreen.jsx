import React from 'react';
import Avatar from '@mui/material/Avatar';
import ShowMoreText from 'react-show-more-text';
import Player from '../Player/Player';
import ThumbsUp from '../../assets/ThumbsUp.svg';
import ThumbsDown from '../../assets/ThumbsDown.svg';
import Save from '../../assets/Save.svg';
import Options from '../../assets/Options.svg';

function VideoScreen() {
  return (
    <div className="videoScreen_container">
      <div className="video_player">
        <Player />
      </div>
      <div className="video_title">
        <p className="time-date">7:30 PM Thursday 21, Apr 2022</p>
        <h1 className="title">How to Create a Useful & Excellent Optimized Section</h1>
      </div>
      <div className="social">
        <div className="nav_profile">
          <Avatar src="" className="profile_DP" />
          <div className="profile_details">
            <p className="Profile_name">Younus Akram</p>
            <p className="Profile_mail">Postexo@gmail.com</p>
          </div>
        </div>
        <div className="social-playlist">
          <div className="like-dislike-div">
            <div className="like-box">
              <div>
                <img src={ThumbsUp} alt="likes" />
              </div>
              3.5k
            </div>
            <div className="thumbDown-div">
              <img src={ThumbsDown} alt="" />
            </div>
          </div>
          <div className="playlist-opt">
            <div className="playlist-div">
              <h4>Add To Playlist</h4>
              <div>
                <img src={Save} alt="save to playlist" />
              </div>
            </div>
            <div className="options-box">
              <div className="options-div">
                <img src={Options} alt="" />
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
            // width={800}
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
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquipna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquipna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip
          </ShowMoreText>
        </p>
      </div>
      <div className="time-desc-box">
        <p className="time">10:31 / 38:20</p>
        <p className="time-para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquipna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip aa...
        </p>
      </div>
    </div>
  );
}

export default VideoScreen;
