
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { HomePage } from '../pages/HomePage';
import { HikePage } from '../pages/HikePage';
import { TestPage } from '../pages/TestPage';
import { ProfilePage } from '../pages/ProfilePage';
import { LogoutPage } from '../pages/LogoutPage';
import { SettingsPage } from '../pages/SettingsPage';
import  LocalAuthenticate  from '../pages/LocalAuthenticate';

// router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function Router({hikesResults}) {

  const isAuthenticated = localStorage.getItem('session_cookie_name');
  
  return(
  <BrowserRouter>
    <div className="Router">
      <Routes>
        <Route exact path="/" element={<HomePage hikesList={hikesResults}/>} />
        <Route path="/hi" element={<LocalAuthenticate/>} />
        <Route path="hike/:hikeLon/:hikeLat/:hikeCity/:hikeState/:hikeCountry" element={<HikePage/>} />
        <Route path="/test" element = {<TestPage/>} />
        <Route path="/profile" element={
          isAuthenticated ? (<ProfilePage />) : (<Navigate to="/hi" />)
        } />
        <Route path="/settings" element={
          isAuthenticated ? (<SettingsPage />) : (<Navigate to="/hi" />)
        } />
        <Route path="/bye" element={
          isAuthenticated ? (<LogoutPage />) : (<Navigate to="/hi" />)
        } />

      </Routes>
      </div>
   </BrowserRouter>
  );
};

export default Router;
