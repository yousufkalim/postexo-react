// Init
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Register from '../containers/Register';
import Login from '../containers/Login';
import PageNotFound from '../containers/PageNotFound';
import Spinner from '../common/Spinner';

const HomePage = React.lazy(() => import('../containers/Home'));
const VideoScreenPage = React.lazy(() => import('../containers/VideoScreen'));
const ProfessorVideosPage = React.lazy(() => import('../containers/ProfessorVideos'));
const LayoutPage = React.lazy(() => import('../hoc/Layout'));
const CategoriesRightPage = React.lazy(() => import('../components/HomeGrid/CategoriesRight'));
const SessionsByMatterPage = React.lazy(() => import('../containers/SessionsByMatter'));
const PlaylistSessionsPage = React.lazy(() => import('../containers/PlaylistSessions'));
const FavouriteSessionsPage = React.lazy(() => import('../containers/FavouriteSessions'));
const WatchLaterSessionsPage = React.lazy(() => import('../containers/WatchLaterSessions'));
const PublicRoutePage = React.lazy(() => import('./PublicRoute'));
const PrivateRoutePage = React.lazy(() => import('./PrivateRoute'));

function Index() {
  const isLogin = localStorage.getItem('token');
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              <PublicRoutePage>
                <HomePage isLogin={isLogin} />
              </PublicRoutePage>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutePage>
                <Register />
              </PublicRoutePage>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutePage>
                <Login />
              </PublicRoutePage>
            }
          />
          <Route
            path="/sessions"
            element={
              <PrivateRoutePage>
                <LayoutPage>
                  <CategoriesRightPage />
                </LayoutPage>
              </PrivateRoutePage>
            }
          />
          <Route
            path="/sessions/favourites"
            element={
              <PrivateRoutePage>
                <LayoutPage>
                  <FavouriteSessionsPage />
                </LayoutPage>
              </PrivateRoutePage>
            }
          />
          <Route
            path="/sessions/watch-later"
            element={
              <PrivateRoutePage>
                <LayoutPage>
                  <WatchLaterSessionsPage />
                </LayoutPage>
              </PrivateRoutePage>
            }
          />
          <Route
            path="/sessions/professor-sessions/:name"
            element={
              <PrivateRoutePage>
                <LayoutPage>
                  <ProfessorVideosPage />
                </LayoutPage>
              </PrivateRoutePage>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <PrivateRoutePage>
                <LayoutPage>
                  <PlaylistSessionsPage />
                </LayoutPage>
              </PrivateRoutePage>
            }
          />
          <Route
            path="/sessions/matter-sessions/:matterName"
            element={
              <PrivateRoutePage>
                <LayoutPage>
                  <SessionsByMatterPage />
                </LayoutPage>
              </PrivateRoutePage>
            }
          />
          <Route
            path="/sessions/:id"
            element={
              <PrivateRoutePage>
                <VideoScreenPage />
              </PrivateRoutePage>
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
      </Suspense>
    </div>
  );
}
export default Index;
