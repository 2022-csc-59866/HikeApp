import { Hike } from '../components/Hike';
import React, { useState, useEffect } from "react";
import { getHikesInAlbum } from '../../services/getHikesInAlbum';
import { useLocation } from 'react-router-dom';

export const AlbumPage = () => {

    const [hikesInAlbum, setHikesInAlbum] = useState([]);
    const location = useLocation();

    const albumId = location.state.albumId;
    useEffect(() => {
        async function fetchHikesInAlbum() {
            const hikes = await getHikesInAlbum({albumId});
            console.log(hikes);
            setHikesInAlbum(hikes);
        }

        fetchHikesInAlbum();
    }, [albumId]);

    return(
        <div className='album-page'>
            <h1>Album Page</h1>
            <div >    
                {hikesInAlbum.map((hike, index) => {
                    return (
                        <div className="card">
                            <h1> Hike: {hike.hike_name} </h1>
                            <h1> Location: {hike.hike_latitude}, {hike.hike_longitude} </h1>
                            <br/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
