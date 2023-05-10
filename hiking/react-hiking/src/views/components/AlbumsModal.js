import React, { useState, useEffect } from 'react';
import logo from '../../img/logo_mountain.png';
import "./AlbumsModal.css";

//services
import { populateUserAlbum } from '../../services/populateUserAlbum';
import { getAlbumIdInfoForUser } from '../../services/getAlbumIdInfoForUser';
import { addHikeToAlbum } from '../../services/addHikeToAlbum';

const AlbumsModal = ({ hike, open, onClose }) => {
  const [albumsList, setAlbumsList] = useState([]);

  useEffect(() => {
    const getAlbumsList = async () => {
      const userId = localStorage.getItem('session_cookie_name');
      const albumsInfo = await getAlbumIdInfoForUser(userId);

      const albumDisplayList = [];
      for (const albumInfo of albumsInfo) {
        const album = await populateUserAlbum({ albumInfo });
        albumDisplayList.push(album);
      }

      setAlbumsList(albumDisplayList);
    };

    if (open) {
      getAlbumsList();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  // Object.keys(hike).forEach((prop)=> console.log(prop));

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
            <h2>Select an Album</h2>
            <div className='albumList'>
              {albumsList.map((album, index) => (
                <div className="card" key={index}>
                  <button onClick={ () => addHikeToAlbum(hike, album)}>{album.album_name}</button>
                </div>
              ))}
            </div>
            <div><button>Select Album</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumsModal;

