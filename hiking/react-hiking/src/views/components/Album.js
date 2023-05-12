import './Album.css';
import React from "react";
//routing
import { Link, useNavigate } from 'react-router-dom';

export const Album = ({ albumId, albumName, coverUrl }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // forward albumId as state in the redirect to be accessed in the AlbumPage for the API request
    navigate(`/profile/album/${albumId}`, {state: { albumId: albumId}} );
} 

  return (
    <div className="album">
      <div className="album-header">
        <div className='card'>
            <img className="album-cover" src={coverUrl} alt={`${albumName} album`}/>
            <Link className="link"  onClick={handleSubmit} to={{pathname: "/profile/album/" + albumId, state: {albumId}}}>
              <p className="album-name">{albumName}</p>
            </Link>
        </div>
      </div>
    </div>
  );
};