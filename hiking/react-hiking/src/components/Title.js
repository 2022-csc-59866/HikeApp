// src/Title.js
import React from 'react'

import '../stylesheets/Title.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Title() {
  return (
    <div className="Title" >
      <div className="btn-group" role="group">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav></div>
        <div class="btn-group">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button">
              <a class="navbar-brand" href="/">Home</a>
            </button>
            <button class="dropdown-item" type="button">
              <a class="navbar-brand" href="profile">Profile</a>
            </button>
            <button class="dropdown-item" type="button" >
              <a class="navbar-brand" href="settings">Settings</a>
            </button>
            <button class="dropdown-item" type="button" >
              <a class="navbar-brand" href="hi">Login</a>
            </button>
            <button class="dropdown-item" type="button" >
              <a class="navbar-brand" href="bye">Logout</a>
            </button>
          </div>
        </div>
    </div>
  )
}
export default Title

