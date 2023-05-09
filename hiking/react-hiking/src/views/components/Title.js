import './Title.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//img
import logo from '../../img/logo_mountain.png';

import React from 'react'
import { useState} from "react";

//routing
import { useNavigate } from 'react-router-dom';

//services
import { convertLocationToCoord} from '../../services/convertLocationToCoord';
import { handleHikeList } from '../../services/handleHikeList';

function Title({ setResults }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(inputValue);
  };
  
  const redirectToHomePage = () => {
    window.location.href = '/'; // Redirect to the home page
  };

  const fetchData = (value) => {
    convertLocationToCoord(value)
      .then((coordinates) => {
        return handleHikeList(coordinates[0], coordinates[1]);
      })
      .then((hikeList) => {
        setResults(hikeList);
        redirectToHomePage();
      });
  };

  const isAuthenticated = localStorage.getItem('session_cookie_name');

  return (
    <div className="Title">
      <div className="btn-group" role="group">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex" onSubmit={handleSubmit}>
              <a href="/">
                <img className="Logo" src={logo} />
              </a>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={inputValue}
                onChange={handleChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" type="button">
            <a class="navbar-brand" href="/">Home</a>
          </button>
          <button class="dropdown-item" type="button">
            <a class="navbar-brand" href="/profile">Profile</a>
          </button>
          <button class="dropdown-item" type="button">
            <a class="navbar-brand" href="/settings">Settings</a>
          </button>
          {isAuthenticated ? (
            <button class="dropdown-item" type="button"> <a class="navbar-brand" href="/bye">Logout</a></button>
          ) : (
            <button class="dropdown-item" type="button"><a class="navbar-brand" href="/hi">Login</a></button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Title;