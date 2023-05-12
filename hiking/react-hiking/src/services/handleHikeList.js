import axios from 'axios';
import { populateHikes } from './populateHikes';

//use FindBikeTrails endpoint, has more data
export function handleHikeList(lat, lon) {
  const options = {
    method: 'GET',
    url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
    params: {
        lat: Math.floor(lat),
        lon: Math.floor(lon),
        radius: '100',        
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
    }
  };
  const axios_request = axios.request(options);

  //populate list of hikes with values returned from the request
  return axios_request.then(response => {
    let hikeList = populateHikes(response.data);
    hikeList.forEach((hike) => {console.log(hike)});
    return hikeList;
  }).catch(error => {
      console.error(error);
  });
}