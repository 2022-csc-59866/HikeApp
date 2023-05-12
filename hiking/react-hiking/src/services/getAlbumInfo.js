import axios from 'axios';

export function getAlbumInfo(albumId) {
    return axios({
      method: "GET",
      url: "/user_albums/get_album_info",
      params: 
        {
        album_id: albumId,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        return res[0];
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }