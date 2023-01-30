// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Register from '../containers/Register';
import Login from '../containers/Login';
import VideoScreen from '../containers/VideoScreen';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import PageNotFound from '../containers/PageNotFound';
import ProfessorVideos from '../containers/ProfessorVideos';
import Layout from '../hoc/Layout';
import CategoriesRight from '../components/HomeGrid/CategoriesRight';
import SessionsByMatter from '../containers/SessionsByMatter';
import PlaylistSessions from '../containers/PlaylistSessions';
import FavouriteSessions from '../containers/FavouriteSessions';
import WatchLaterSessions from '../containers/WatchLaterSessions';

function Index() {
  const isLogin = localStorage.getItem('token');
  return (
    <div>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home isLogin={isLogin} />
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
          path="/sessions"
          element={
            <PrivateRoute>
              <Layout>
                <CategoriesRight />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sessions/favourites"
          element={
            <PrivateRoute>
              <Layout>
                <FavouriteSessions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sessions/watch-later"
          element={
            <PrivateRoute>
              <Layout>
                <WatchLaterSessions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sessions/professor-sessions/:name"
          element={
            <PrivateRoute>
              <Layout>
                <ProfessorVideos />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <PrivateRoute>
              <Layout>
                <PlaylistSessions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sessions/matter-sessions/:matterName"
          element={
            <PrivateRoute>
              <Layout>
                <SessionsByMatter />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sessions/:id"
          element={
            <PrivateRoute>
              <VideoScreen />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/sessions/:id"
          element={
            <PrivateRoute>
              <VideoScreen />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}
export default Index;
