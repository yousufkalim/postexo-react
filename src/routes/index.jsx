// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Register from '../containers/Register';
import Login from '../containers/Login';
import HomeGrid from '../containers/HomeGrid';
import VideoScreen from '../containers/VideoScreen';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

function Index() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomeGrid />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/:id"
          element={
            <PrivateRoute>
              <VideoScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/video"
          element={
            <PrivateRoute>
              <VideoScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
export default Index;
