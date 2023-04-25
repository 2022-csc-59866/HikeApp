// //using trailsAPI, legacy

// import React from 'react';
// import axios from 'axios';
// import Hike from './Hike.js';

// export default class HikeList extends React.Component {
//   state = {
//     hikes: []
//   }

//   //get a list of hikes
//   populateHikes (body){
//     let hikesList = [];
//     for (let element_i in body) {
//       const hike_preprocess = body[element_i];
//       //hike length?
//       //create a hike js object
//       const hike = new Hike(hike_preprocess.name, hike_preprocess.city, hike_preprocess.state,
//                             hike_preprocess.country, hike_preprocess.lat, hike_preprocess.lon,
//                             hike_preprocess.parent_id, hike_preprocess.place_id,
//                             hike_preprocess.description);
//       hikesList.push(hike);
//       console.log(hike);
//     }
//     return hikesList;
//   }

//   componentDidMount() {
//     // getMap endpoint, js & ping ok
//     // const options = {
//     //     method: 'GET',
//     //     //23 is hike id and it's hardcoded, need to change it wot `{}`
//     //     url: 'https://trailapi-trailapi.p.rapidapi.com/trails/255/maps/',
//     //     headers: {
//     //       'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
//     //       'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
//     //     }
//     // };

//     // //legacy -> good
//     // use legacy endpoint to get data
//     const options = {
//       //params are hardcoded
//       method: 'GET',
//       url: 'https://trailapi-trailapi.p.rapidapi.com/activity/',
//       params: {
//         lat: '34.1',
//         limit: '25',
//         lon: '-105.2',
//         radius: '25',
//         'q-activities_activity_type_name_eq': 'hiking'
//       },
//       headers: {
//         'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
//         'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
//       }
//     };
//     console.log('before');

//     //make an axios request
//     const axios_request = axios.request(options);
//     console.log('after');

//     //populate list of hikes with values returned from the request
//     axios_request.then(response => {
//       // console.log("response data " + response.data + " typeof response " + typeof response.data);
//       let hikes = this.populateHikes(response.data);
//       this.setState({hikes});
//     }).catch(error => {
//         console.error(error);
//     });
//     console.log("after after");
//   }

//   render() {
//     return (
//       this.state.hikes.map( hike =>
//         <div style={{border: '1px solid #29085B'}}>
//         <p style={{border: '2px solid #29085B'}}> 
//           <center> {hike.name}</center>
//           <center> {hike.city}</center>
//           <center> {hike.state}</center>
//         </p>
//         <ul>
//           <li>Info: {hike.description}</li>
//           <li>Longitude: {hike.lon}</li>
//           <li>Latitude: {hike.lan}</li>
//         </ul>
//       </div>
//       )
//     );
//   }
// }