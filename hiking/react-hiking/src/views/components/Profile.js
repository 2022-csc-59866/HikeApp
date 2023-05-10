
import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/getUserInfo';


export const Profile = ({completedHikes, bio}) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function retrieveUserInfo() {
      try {
        const userId = localStorage.getItem('session_cookie_name');
        const info = await getUserInfo({ userId });
        setUserInfo(info[0]);
      } catch (error) {
        console.error('Failed to retrieve user info:', error);
      }
    }

    retrieveUserInfo();
  }, []);

  if (!userInfo) {
    // Render loading state or placeholder while waiting for the response
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={userInfo.avatar_url} 
          alt={`${userInfo.first_name}'s avatar`}
          width="250"
          height="250"
        />
        <h1 className="profile-name">{`${userInfo.first_name} ${userInfo.last_name}`}</h1>
        {/* TODO: add bio in db, and option to edit */}
        <p className="profile-bio">{bio}</p>
      </div>
      <div className="profile-stats">
        <div className="profile-stat">
          <h3 className="profile-stat-label">Completed Hikes</h3>
          {/* Add completed hikes tracker functionality */}
          <p className="profile-stat-value">{completedHikes}</p>
        </div>
      </div>
    </div>
  );
};
