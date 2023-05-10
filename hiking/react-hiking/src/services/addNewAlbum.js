import axios from 'axios';
import  Album_obj  from '../services/Album_obj';
import {v4 as uuidv4} from 'uuid';


export function addNewAlbum(name, userId) {
    
    function createEmptyCustomAlbum(album) {
        axios({
            method: "POST",
            url: "/user_albums/create_custom_empty",
            data: {
              "album_name": `${album.album_name}`,
              "user_id": `${album.user_id}`,
              "album_type": `${album.album_type}`,
              "album_id": `${album.album_id}`
            }
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
            //redirect to user page
            //TODO: currently hardcoded
            window.location.href = `http://localhost:3000/profile/`;
        }).catch((error) => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
    })}

    const album = new Album_obj(uuidv4(), name, userId, "CUSTOM", []);
    createEmptyCustomAlbum(album);
}