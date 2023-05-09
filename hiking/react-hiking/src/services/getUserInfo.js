//GET request to users/get_user_info

import axios from 'axios';

export function getUserInfo({ userId }) {

    console.log("userid before API call to user data: " + userId);

    return axios({
      method: "GET",
      url: "/users/get_user_info",
      params: 
        {
            user_id: `${userId}`,
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
  