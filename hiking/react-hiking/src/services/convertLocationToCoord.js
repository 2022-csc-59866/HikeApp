import axios from 'axios';

//get coordinates from a location
export async function convertLocationToCoord(location) {

  // console.log("location (in convert function)= " + location);
  //remove from component, move to a utility
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_COORDINATE_KEY;
  const options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}?radius=50&key=${API_KEY}`,
  };

  //make an axios request
  const axios_request = axios.request(options);

  return axios_request.then(response => {  
    console.log(response.data);
    if (response.data.status === "OK") {
      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;
      console.log("latitude = " + latitude + ", longitude = " + longitude);
      return [latitude, longitude];
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
