// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Register from '../containers/Register';
import Login from '../containers/Login';
import HomeGrid from '../containers/HomeGrid';
import VideoScreen from '../containers/VideoScreen';

function Index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homegrid" element={<HomeGrid />} />
        <Route path="/video" element={<VideoScreen />} />
      </Routes>
    </div>
  );
}
export default Index;
