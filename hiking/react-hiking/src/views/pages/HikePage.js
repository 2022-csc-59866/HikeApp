import { useState, useEffect } from "react"

// router, custom hook to link to a hike
import { useParams } from "react-router-dom";
import { fetchHike } from './../../services/fetchHike';

import { Directions } from '../components/Directions';
import { Maps } from '../components/Maps';

export const HikePage = () => {

    const { hikeLon, hikeLat, hikeCity, hikeState, hikeCountry } = useParams();
    const [ hike, setHike ] = useState(null);
	
	useEffect(() => {
    //API call to Trail API to fetch hike data
    async function fetchHikeData(hikeLon, hikeLat, hikeCity, hikeState, hikeCountry) {
      const hikeData = await fetchHike(hikeLon, hikeLat, hikeCity, hikeState, hikeCountry);
      setHike(hikeData);
    }

    fetchHikeData(hikeLon, hikeLat, hikeCity, hikeState, hikeCountry);

	}, [ hikeLon, hikeLat, hikeCity, hikeState, hikeCountry ])
  
  return (
    <div className="hike-page">
      <div className="card">
        <Maps lat={hike !== null ? Object.values(hike)[0].lat : ""} lon={hike !== null ? Object.values(hike)[0].lon : ""} />
        <h1>{ hike !== null ? Object.values(hike)[0].name : ""}</h1>
        <p>{ hike !== null ? Object.values(hike)[0].description : ""}</p>
        
      </div>
      <div className="card">
      <Directions hikeLatitude={hike !== null ? Object.values(hike)[0].lat : ""} 
                    hikeLongitude={hike !== null ? Object.values(hike)[0].lon : ""}/>
      </div>
    </div>
  )
}