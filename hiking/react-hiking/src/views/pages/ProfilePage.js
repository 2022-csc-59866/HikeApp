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
    // const [albums, setAlbums] = useState([]);

    function createAlbum() {
        setOpenModal(true);
    }

    // useEffect(() => {
    //     //always load hikes in Alabama 
    //     async function retrieveAlbums () {
    //         const userId = localStorage.getItem('session_cookie_name');
    //         const albums = await getAlbumIdInfoForUser(userId);
    //         console.log(albums);
    //         return albums;
    //     }


    //     setAlbums(retrieveAlbums());

    // }, []); // whats needed in useEffect

    return (
    <div className="home">
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
            <div class="card-group">
                <div className="card">
                    <Album 
                        albumName={"Completed"}
                        albumId={1}
                        // TODO: pass name dynamically
                        userName={"John"}
                        coverUrl={mountain}
                        className="album-cover"
                    />
                </div>
                <div class="card">
                    <Album
                        albumName={"Favorite"}
                        // TODO: pass name dynamically
                        albumId={2}
                        userName={"John"}
                        coverUrl={fav}
                        className="album-cover"
                    />
                </div>
                {/* <div className='custom-albums'>
                    {
                    albums.map((album, index) => {
                    return (
                    <div className="card">
                        <Album
                            albumId={album.album_id}
                            albumName={album.album_name}
                        /> 
                    </div>
                    )}
                )}
                </div> */}
                {/* TODO: hook button to create new functionality */}
                <div class="card" >
                    <button className='modalButton' onClick={createAlbum}>Create New Album</button>
                    <NewAlbumModal
                    open={openModal} 
                    onClose={() => setOpenModal(false)} />
                    </div>
                </div>
                {/* TODO: add more albums dynamically */}
            </div>
        }
        </div>
    </div>
    )
}
