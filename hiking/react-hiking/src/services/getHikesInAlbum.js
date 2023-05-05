import axios from 'axios';

export function getHikesInAlbum({ albumId }) {

    // console.log("albumid before API call: " + albumId);
    console.log("album_id: " + `${String(albumId)}`);

    return axios({
      method: "GET",
      url: "/album_hikes/get_all",
      params: 
        {
        album_id: `${String(albumId)}`,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        return res;
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }
  
