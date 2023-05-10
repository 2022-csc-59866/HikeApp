import axios from 'axios';

export function addHikeToAlbum(hike, album) {
    function addHikeToAlbum_HikesTable([hike, album]) {
        axios({
            method: "POST",
            url: "/album_hikes/add_hike_to_album",
            data: {
              "album_id": album.album_id,
              "hike_name": hike.name,
              "hike_lat": hike.lat,
              "hike_lon": hike.lon
            }
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
            //redirect to user page
        }).catch((error) => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
    })}

    addHikeToAlbum_HikesTable([hike, album]);
}