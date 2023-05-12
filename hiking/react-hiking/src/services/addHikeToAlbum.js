import axios from 'axios';

export function addHikeToAlbum(hike, album) {
    function addHikeToAlbum_HikesTable([hike, album]) {
        axios({
            method: "POST",
            url: "/album_hikes/add_hike_to_album",
            data: {
              "album_id": album.album_id,
              "hike_id": hike.id,
              "hike_api_id": hike.apiId,
            }
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
        }).catch((error) => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
    })}

    addHikeToAlbum_HikesTable([hike, album]);
}