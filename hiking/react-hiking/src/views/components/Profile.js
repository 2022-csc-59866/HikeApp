import React from 'react';

export const Profile = ({ name, bio, avatarUrl, completedHikesCount }) => {
  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-avatar" src={avatarUrl} alt={`${name}'s avatar`} width="250"
        height="250" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
      <div className="profile-stats">
        <div className="profile-stat">
          <h3 className="profile-stat-label">Completed Hikes</h3>
          <p className="profile-stat-value">{completedHikesCount}</p>
        </div>
      </div>
    </div>
  );
};

