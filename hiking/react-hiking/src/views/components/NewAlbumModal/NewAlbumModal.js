import React, { useState } from 'react';
import logo from '../../img/logo_mountain.png';

import { addNewAlbum } from '../../services/addNewAlbum';
 
export const NewAlbumModal = ({ open, onClose }) => {
    
    const [albumName, setAlbumName] = useState('');
    if (!open) {
        return null;
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('session_cookie_name');
        console.log(albumName);
        addNewAlbum(albumName, userId);
    }

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
            <h2>Create a New Album</h2>
            <form className=" new-album-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Album name</label>
                <input value={albumName} onChange={(e) => setAlbumName(e.target.value)}type="name" placeholder="Album Name" id="album-name" name="album-name" />
                <button type="submit">Create Album</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

