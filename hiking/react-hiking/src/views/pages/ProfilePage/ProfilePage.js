import { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './ProfilePage.css';

import ScrollToTop from 'react-scroll-to-top';

//images
import fav from "../../../img/fav.svg"
import mountain from "../../../img/mountain.svg"

//functions
import { getAlbumIdInfoForUser } from '../../../services/getAlbumIdInfoForUser';

// components
import { Profile } from "../../components/Profile/Profile";
import { Album } from "../../components/Album/Album";
import { NewAlbumModal } from '../../components/NewAlbumModal/NewAlbumModal';

export const ProfilePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [albums, setAlbums] = useState([]);

    function createAlbum() {
        setOpenModal(true);
    }

    useEffect(() => {
        async function retrieveAlbums () {
            const userId = localStorage.getItem('session_cookie_name');
            const albums = await getAlbumIdInfoForUser(userId);
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
                    bio={"I like hiking"}
                    completedHikes={10}
                /> 
            </div>
        }
        {   <div className="container-fluid">
            <div className="card">
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
                        <Album key={index}
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
        <ScrollToTop className="scroll" smooth color="#5D9C59"  viewBox="256 256 1024 1024"/>
        </div>
    </div>
    )
}
