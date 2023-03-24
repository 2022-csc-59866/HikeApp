
import React from 'react'
import '../stylesheets/Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from '../pages/HomePage';
import { HikePage } from '../pages/HikePage';
import { TestPage } from '../pages/TestPage';
import  LocalAuthenticate  from '../pages/LocalAuthenticate';

// router
import { useRoutes } from 'react-router-dom';

function Body() {
    const routes = useRoutes([
        { path: '/', element: <HomePage /> },
        { path: '/hi', element: <LocalAuthenticate/> },
        { path: 'hike/:hikeLon/:hikeLat/:hikeCity/:hikeState/:hikeCountry', element: <HikePage />},
		    { path: '/test', element: <TestPage/>},
    ]);
  return routes;
};

export default Body;