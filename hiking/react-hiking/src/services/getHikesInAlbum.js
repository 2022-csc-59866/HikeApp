import axios from 'axios';

// get all hikes saved in album
export function getHikesInAlbum(albumId) {

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
  
