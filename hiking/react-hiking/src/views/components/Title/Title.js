import './Title.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//img
import logo from '../../img/logo_mountain.png';

import React from 'react'
import { useState} from "react";

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
  
  const fetchData = (value) => {
    convertLocationToCoord(value)
      .then((coordinates) => {
        //coordinates[0] - longitude
        //coordinates[1] - latitude
        return handleHikeList(coordinates[1], coordinates[0]);
      })
      .then((hikeList) => {
        setResults(hikeList);
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
      <div className="btn-group">
        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <button className="dropdown-item" type="button">
            <a className="navbar-brand" href="/">Home</a>
          </button>
          <button className="dropdown-item" type="button">
            <a className="navbar-brand" href="/profile">Profile</a>
          </button>
          <button className="dropdown-item" type="button">
            <a className="navbar-brand" href="/settings">Settings</a>
          </button>
          {isAuthenticated ? (
            <button className="dropdown-item" type="button"> <a className="navbar-brand" href="/bye">Logout</a></button>
          ) : (
            <button className="dropdown-item" type="button"><a className="navbar-brand" href="/hi">Login</a></button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Title;