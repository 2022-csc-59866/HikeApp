import axios from 'axios';
import { populateHikes } from './populateHikes';

//move to services
export function handleHikeList(lat, lon) {
  console.log("in handle hike list: latitide " + lat + ", longitude: " + lon);
  const options = {
    method: 'GET',
    url: 'https://trailapi-trailapi.p.rapidapi.com/activity/',
    params: {
        lat: {lat},
        limit: '20',
        lon: {lon},
        radius: '25',
        'q-activities_activity_type_name_eq': 'hiking'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
    }
  };
  const axios_request = axios.request(options);

  //populate list of hikes with values returned from the request
  return axios_request.then(response => {
    console.log(response);
    let hikeList = populateHikes(response.data);
    hikeList.forEach((hike) => {console.log(hike)});
    return hikeList;
  }).catch(error => {
      console.error(error);
  });
}