import axios from 'axios';
import { populateHikes } from './populateHikes';

// use data in project instead of TrailsAPI
export async function fetchBikeTrails(id) {
  return axios({
    method: 'GET',
    url: `/hike/get_bike_trail_by_id`,
    params: {
      'id': id,
    }
  })
      .then((response) => {
        const res = response.data;
        console.log(res);
        let hikeList = populateHikes(res);
        hikeList.forEach((hike) => {console.log(hike)});
        return hikeList[0];
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
}

// export async function fetchBikeTrails(id) {
//     return axios({
//       method: 'GET',
//       url: `https://trailapi-trailapi.p.rapidapi.com/trails/${id}`,
//       headers: {
//         'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
//         'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
//       }
//     })
//         .then((response) => {
//           const res = response.data;
//           console.log(res);
//           let hikeList = populateHikes(res);
//           hikeList.forEach((hike) => {console.log(hike)});
//           return hikeList[0];
//         })
//         .catch((error) => {
//           if (error.response) {
//             console.log(error.response);
//           }
//         });
// }


