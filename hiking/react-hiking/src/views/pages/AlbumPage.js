import { Hike } from '../components/Hike';
import React, { useState, useEffect } from "react";
import { getHikesInAlbum } from '../../services/getHikesInAlbum';
import { useLocation } from 'react-router-dom';
import { fetchBikeTrails } from '../../services/fetchBikeTrails';
import { getAlbumInfo } from '../../services/getAlbumInfo';

export const AlbumPage = () => {
    const [hikesInAlbum, setHikesInAlbum] = useState([]);
    const [albumDetails, setAlbumDetails] = useState({});
  
    const location = useLocation();
    const albumId = location.state.albumId;
  
    useEffect(() => {
      async function fetchHikesInAlbum(albumId) {
        const hikes = await getHikesInAlbum(albumId);
  
        const hikesData = [];
        for (const hike of hikes) {
          const hikeData = await fetchBikeTrails(Math.floor(hike.hike_api_id));
          hikesData.push(hikeData);
        }
        setHikesInAlbum(hikesData);
      }
  
      async function fetchAlbumDetails(albumId) {
        console.log("Fetching album details...");
        const album = await getAlbumInfo(albumId);
        console.log("Album details:", album);
        setAlbumDetails(album);
      }
  
      fetchHikesInAlbum(albumId);
      fetchAlbumDetails(albumId);
    }, [albumId]);
  
    console.log("Album details in component:", albumDetails);
  
    return (
      <div className='album-page'>
        <h1>{albumDetails.album_name ? albumDetails.album_name : "Loading..."}</h1>
        <div>
          {hikesInAlbum.map((hike, index) => {
            return (
              <div className="card" key={index}>
                <Hike hike={hike} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  