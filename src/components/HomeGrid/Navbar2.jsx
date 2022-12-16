/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
// import {  } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import LOGOSVG from '../../assets/LOGO.svg';
import SearchIcon from '../../assets/SearchIcon.svg';

function Navbar2({ openNavMenu }) {
  const navigate = useNavigate();
  const SearchEvent = () => {
    navigate('/home');
  };
  return (
    <>
      <MenuIcon className="hambgr" onClick={openNavMenu} />
      <nav className="navBar_2" style={{ backgrounColor: 'red' }}>
        <div>
          <Link to="/">
            <img className="navbar-logo-svg2" src={LOGOSVG} alt="postexologo" />
          </Link>
        </div>
        <div className="navBar_2_container">
          <div className="input_search_div">
            <input className="nav_search_bar" type="text" placeholder="UI/UX Design" />
            <img
              src={SearchIcon}
              alt=""
              className="searchIcon"
              onClick={SearchEvent}
              onKeyDown={SearchEvent}
            />
          </div>
          <div className="nav_profile">
            <Avatar src="" className="profile_DP" />
            <div className="profile_details">
              <p className="Profile_name">Younus Akram</p>
              <p className="Profile_mail">Postexo@gmail.com</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar2;
