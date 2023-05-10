import axios from 'axios';

export async function fetchHike(hikeLon, hikeLat, hikeCity, hikeState, hikeCountry) {
    return axios({
        method: 'GET',
        url: 'https://trailapi-trailapi.p.rapidapi.com/activity/',
        params: {
            lat: hikeLat,
            limit: '1',
            lon: hikeLon,
            radius: '1',
            city: hikeCity,
            state: hikeState,
            country: hikeCountry,
            'q-activities_activity_type_name_eq': 'hiking'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
        }
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