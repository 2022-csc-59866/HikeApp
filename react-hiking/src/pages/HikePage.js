import { useState, useEffect } from "react"
import axios from "axios"

// router, custom hook to link to a hike
import { useParams } from "react-router-dom";

// utils
import {populateHikes} from "../utils/populateHikes";

export const HikePage = () => {

    const { hikeLon, hikeLat, hikeCity, hikeState, hikeCountry } = useParams();

    const [ hike, setHikes ] = useState([]);
	
	useEffect(() => {
		const handleHikeList = () => {
			const options = {
				method: 'GET',
				url: 'https://trailapi-trailapi.p.rapidapi.com/activity/',
                params: {
                  lat: hikeLat,
                  limit: '25',
                  lon: hikeLon,
                  radius: '1',
                  city: hikeCity,
                  state: hikeState,
                  country: hikeCountry,
                  // 'q-activities_activity_type_name_eq': 'hiking'
                },
				headers: {
					'X-RapidAPI-Key': process.env.REACT_APP_RAPID_KEY,
					'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
				}
			};
            const axios_request = axios.request(options);
            console.log('after');
        
            //populate list of hikes with values returned from the request
            axios_request.then(response => {
            let hikeList = populateHikes(response.data);
            setHikes(hikeList);
            }).catch(error => {
                console.error(error);
            });
		}
		handleHikeList();
	}, [ hikeLon, hikeLat, hikeCity, hikeState, hikeCountry ])

  return (
    <div className="hike-page">
        <h1>{hike.name}</h1>
        <p>{hike.description}</p>
    </div>
  )

}



