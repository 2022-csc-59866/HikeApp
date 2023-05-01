
import React from 'react'
import './Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from '../pages/HomePage';
import { HikePage } from '../pages/HikePage';
import { TestPage } from '../pages/TestPage';
import { ProfilePage } from '../pages/ProfilePage';
import  LocalAuthenticate  from '../pages/LocalAuthenticate';

// router
import { useRoutes } from 'react-router-dom';

function Body({hikesResults}) {

  const routes = useRoutes([
      { path: '/', element: <HomePage hikesList={hikesResults}/> },
      { path: '/hi', element: <LocalAuthenticate/> },
      // TODO: make it dynamic
      { path: '/profile/:email', element: <ProfilePage /> },
      { path: 'hike/:hikeLon/:hikeLat/:hikeCity/:hikeState/:hikeCountry', element: <HikePage />},
      { path: '/test', element: <TestPage/>},
  ]);
  return routes;
};

export default Body;