//GET request to user_albums/get_all_albums

import axios from 'axios';

export function getAlbumIdInfoForUser(userId) {

    return axios({
      method: "GET",
      url: "/user_albums/get_all_albums",
      params: 
        {
        user_id: `${String(userId)}`,
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
  