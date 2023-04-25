import React from 'react';

export const Album = ({ userName, albumName, coverUrl }) => {
  return (
    <div className="album">
      <div className="album-header">
        <div className='card'>
            <img className="album-cover" src={coverUrl} alt={`${albumName} album`} width="75"
        height="75" />
            <a href={userName+"/" + albumName} class="card-link">
                <p className="album-name">{albumName}</p>
            </a>
        </div>
      </div>
    </div>
  );
};