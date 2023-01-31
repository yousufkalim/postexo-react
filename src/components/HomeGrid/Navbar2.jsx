/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import SearchInput from 'react-search-input';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import LOGOSVG from '../../assets/LOGO.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import ChangePassword from '../Screen/ChangePassword';

function Navbar2({ openNavMenu, setSearchText }) {
  const [showOptions, setShowOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const history = useLocation();

  // eslint-disable-next-line prefer-regex-literals
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

  const isSessionUrl = history.pathname.includes('sessions') && checkForHexRegExp.test(params?.id);

  const handleClick = () => {
    setOpen(true);
    setShowOptions(false);
  };

  const navigate = useNavigate();
  const SearchEvent = () => {
    navigate('/sessions');
  };

  const handleOpen = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('userData'));
  return (
    <>
      <ChangePassword open={open} setOpen={setOpen} />

      <MenuIcon id="TEsting" className="hambgr" onClick={openNavMenu} />
      <nav className="navBar_2" style={{ backgrounColor: 'red' }}>
        <div>
          <Link to="/sessions">
            <img className="navbar-logo-svg2" src={LOGOSVG} alt="postexologo" />
          </Link>
        </div>
        <div className="navBar_2_container">
          <div className="input_search_div">
            <SearchInput className="nav_search_bar" onChange={(value) => setSearchText(value)} />
            {/* <input className="nav_search_bar" type="text" placeholder="UI/UX Design" /> */}
            <img
              src={SearchIcon}
              alt=""
              className="searchIcon"
              onClick={SearchEvent}
              onKeyDown={SearchEvent}
            />
          </div>
          <div className="nav_profile">
            <Avatar onClick={() => handleOpen()} src="" className="profile_DP" />
            {showOptions && (
              <div className="profile_options">
                <div className="logout_div">
                  <li role="presentation" className="presentation" onClick={() => handleClick()}>
                    Change Password
                  </li>
                  <li role="presentation" className="presentation" onClick={() => handleLogout()}>
                    Logout
                  </li>
                </div>
              </div>
            )}
            <div className="profile_details">
              <p className="Profile_name">{user?.name}</p>
              <p className="Profile_mail">{user?.email}</p>
            </div>
          </div>
        </div>
      </nav>
      {!isSessionUrl && (
        <div className="input_search_div_mobile">
          <SearchInput className="nav_search_bar" onChange={(value) => setSearchText(value)} />
          {/* <input className="nav_search_bar" type="text" placeholder="UI/UX Design" /> */}
          <img
            src={SearchIcon}
            alt=""
            className="searchIcon"
            onClick={SearchEvent}
            onKeyDown={SearchEvent}
          />
        </div>
      )}
    </>
  );
}

export default Navbar2;
