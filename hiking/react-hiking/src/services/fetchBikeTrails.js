import axios from 'axios';
import { populateHikes } from './populateHikes';

//use BikeTrailInfo endpoint to look up hike by ID
// NOTE: hike ID comes as part of a response from the same TrailAPI different endpoint
// hike IDs are not always the same between endpoints

export async function fetchBikeTrails(id) {
    return axios({
      method: 'GET',
      url: `https://trailapi-trailapi.p.rapidapi.com/trails/${id}`,
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
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