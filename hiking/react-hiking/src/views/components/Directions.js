import React from 'react';
import axios from 'axios';

export default class Directions extends React.Component {
  state = {
    directions: [],

  }
  
  componentDidMount() {
    //remove from component, move to a utility
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_COORDINATE_KEY;
    const options = {
      //params are hardcoded
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=Mountain+View,+CA&key=${API_KEY}`,
    };
    //make an axios request
    const axios_request = axios.request(options);
    axios_request.then(response => {  
      console.log(response.data);
      let latitude = response.data.results[0].geometry.location.lat;
      let longitude = response.data.results[0].geometry.location.lng;

      console.log(latitude, longitude);
      this.latitude = latitude;
      this.longitude = longitude
      return response;
    })
    .catch((e) => {
      alert("Something went wrong: " + e);
    });
  }

  render() {
    return (
        <div>{this.latitude}, {this.longitude}</div>

    );
  }

  
  // calcRoute() {
  //   let start = document.getElementById('start').value;
  //   let end = document.getElementById('end').value;
  //   let request = {
  //     origin: start,
  //     destination: end,
  //     travelMode: 'TRANSIT'
  //   };
  //   directionsService.route(request, function(result, status) {
  //     if (status == 'OK') {
  //       directionsRenderer.setDirections(result);
  //     }
  //   });
  // }
}
