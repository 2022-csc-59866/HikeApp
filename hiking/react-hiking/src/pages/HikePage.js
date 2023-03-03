import { useState, useEffect } from "react"
import axios from "axios"

// router, custom hook to link to a hike
import { useParams } from "react-router-dom";
import { Maps } from '../components/Maps';

export const HikePage = () => {

    const { hikeLon, hikeLat, hikeCity, hikeState, hikeCountry } = useParams();
    const [ hike, setHike ] = useState(null);
	
	useEffect(() => {
		const handleHikeList = () => {
			const options = {
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
					'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY, //works when hardcoded?
					'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
				}
			};
    const axios_request = axios.request(options);        
    //populate list of hikes with values returned from the request
    axios_request.then(response => {
      setHike(response.data);
    }).catch(error => {
        console.error(error);
    });
		}

		handleHikeList();
	}, 
  [ hikeLon, hikeLat, hikeCity, hikeState, hikeCountry ])
  
  console.log(hike);
  return (
    <div className="hike-page">
      <div class="media" m-3 p-3>
        <a class="media-left">
        <img class="rounded" src="https://st4.depositphotos.com/2547313/20580/i/600/depositphotos_205809874-stock-photo-evening-scene-titlis.jpg"/>
        {/* { hike !== null ? 
            <div><Maps lon={Object.values(hike[0]).lon} lat={Object.values(hike[0]).lat}/> </div> : ""}  */}
        </a>
        <h1>{ hike !== null ? Object.values(hike)[0].name : ""}</h1>
        <p>{ hike !== null ? Object.values(hike)[0].description : ""}</p>
        {<div>Hello world</div>}
    </div></div>
  )
}