// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Register from '../containers/Register';
import Login from '../containers/Login';

function Index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default Index;
