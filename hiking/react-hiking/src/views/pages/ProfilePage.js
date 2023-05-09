import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from 'react';
// components
import { Profile } from "../components/Profile";
import { Album } from "../components/Album";
import { NewAlbumModal } from '../components/NewAlbumModal';
import { useState } from 'react';
//images
import fav from "../../img/fav.svg"
import mountain from "../../img/mountain.svg"

import './ProfilePage.css';
import { getAlbumIdInfoForUser } from '../../services/getAlbumIdInfoForUser';

export const ProfilePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [albums, setAlbums] = useState([]);

    function createAlbum() {
        setOpenModal(true);
    }

    useEffect(() => {
        async function retrieveAlbums () {
            const userId = localStorage.getItem('session_cookie_name');
            console.log("userID == " + userId);
            const albums = await getAlbumIdInfoForUser({userId});
            console.log("albums === " + albums);
            return albums;
        }


        retrieveAlbums().then((fetchedAlbums) => {
            setAlbums(fetchedAlbums);
        });

    }, []); // whats needed in useEffect

    return (
    <div className="profile">
        <div class="container-fluid">
        {/* TODO: Profile info is hardcoded, get it from db */}
        {
            
            <div className="card">
                <Profile
                    name={"John"}
                    bio={"I like hiking"}
                    avatarUrl={"https://cdn-icons-png.flaticon.com/512/5556/5556468.png"}
                    completedHikesCount={10}
                /> 
            </div>
        }
        {   <div class="container-fluid">
            <div class="card">
                <div className="album-card">
                    <Album
                        albumName={"Favorite"}
                        // TODO: pass name dynamically
                        albumId={2}
                        userName={"John"}
                        coverUrl={fav}
                        className="album-cover"
                    />
                    {
                    albums.map((album, index) => {
                    return (
                        <Album
                            albumId={album.album_id}
                            albumName={album.album_name}
                            coverUrl={mountain}
                            className="album-cover"
                        /> 
                    )}
                )}</div>
                <div><button className='modalButton' onClick={createAlbum}>Create New Album</button></div>
                <NewAlbumModal open={openModal} onClose={() => setOpenModal(false)} />
                </div>
            </div>
        }
        </div>
    </div>
    )
}
