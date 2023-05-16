
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// pages
import { HomePage } from '../../pages/HomePage/HomePage';
import { HikePage } from '../../pages/HikePage/HikePage';
import { AlbumPage } from '../../pages/AlbumPage/AlbumPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { LogoutPage } from '../../pages/LogoutPage/LogoutPage';
import { SettingsPage } from '../../pages/SettingsPage/SettingsPage';
import  LocalAuthenticate  from '../../pages/LocalAuthentication/LocalAuthenticate';

function Router({hikesResults}) {

  const isAuthenticated = localStorage.getItem('session_cookie_name');
  
  return(
  <BrowserRouter>
    <div className="Router">
      <Routes>
        <Route exact path="/" element={<HomePage hikesList={hikesResults}/>} />
        <Route exact path="/hi" element={<LocalAuthenticate/>} />
        <Route exact path="hike/:hikeId" element={<HikePage/>} />
        <Route exact path="/profile" element={
          isAuthenticated ? (<ProfilePage />) : (<Navigate to="/hi" />)
        } />
        <Route exact path="/settings" element={
          isAuthenticated ? (<SettingsPage />) : (<Navigate to="/hi" />)
        } />
        <Route exact path="/bye" element={
          isAuthenticated ? (<LogoutPage />) : (<Navigate to="/hi" />)
        } />
        <Route path="/profile/album/:albumId" element={
          isAuthenticated ? (<AlbumPage />) : (<Navigate to="/hi" />)
        } />
      </Routes>
      </div>
   </BrowserRouter>
  );
};

export default Router;
