import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
import Navbar from '../common/Navbar';
import HomeSection from '../components/LandingPage/HomeSection';
import Courses from '../components/LandingPage/Courses';

// eslint-disable-next-line no-shadow
function Home() {
  return (
    <>
      <Navbar />
      <HomeSection />
      <Courses />
    </>
  );
}

export default Home;
