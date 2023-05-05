import React from 'react';
import logo from '../../img/logo_mountain.png';
import "./AlbumsModal.css";

// router
import { Link } from "react-router-dom";

export const AlbumsModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <img src={logo} alt='/' />
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <h2>Selet an Album</h2>
            <ul className='modal-ul'>
              {/* populate with user albums */}
              {/* <li><Link to={`/profile/${album.id}`}>{album.name}</Link></li> */}
              <li className='modal-li'><Link className="link" to={`/profile/ab`}>ALBUM AB</Link></li>
              <br/>
              <li className='modal-li'><Link className="link" to={`/profile/fav`}>fav</Link></li>
            </ul>
          </div>
          <div className='btnContainer'>
            <button className='btnPrimary'>
              <span className='bold'>+</span> New Album
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};