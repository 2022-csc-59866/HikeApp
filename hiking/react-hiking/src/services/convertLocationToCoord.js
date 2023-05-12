import axios from 'axios';

export async function convertLocationToCoord(location) {

  //API call to Google to convert Location name to coodrinates
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_COORDINATE_KEY;
  const options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}?radius=50&key=${API_KEY}`,
  };

  const axios_request = axios.request(options);

  return axios_request.then(response => {  
    console.log(response.data);
    if (response.data.status === "OK") {
      let longitude = response.data.results[0].geometry.location.lng;
      let latitude = response.data.results[0].geometry.location.lat;
      return [longitude, latitude];
    // } else if (response.data.status === "ZERO_RESULTS"){
      //pop up no results
      // alert("No results");
    } else {
      // alert("Something went wrong");
      return [0,0];
    }
  })
  .catch((e) => {
    alert("Something went wrong: " + e);
  });
}
