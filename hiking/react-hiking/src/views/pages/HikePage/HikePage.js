import { useState, useEffect } from "react";

//routing
import { useParams } from "react-router-dom";

import ScrollToTop from "react-scroll-to-top";

//components
import { Directions } from '../../components/Directions/Directions';
import { Maps } from '../../components/Maps/Maps';
import Loading  from '../../components/Loading/Loading';

//services
import { fetchBikeTrails } from "../../../services/fetchBikeTrails";

export const HikePage = () => {
  const { hikeId } = useParams();
  const [hike, setHike] = useState(null);

  useEffect(() => {
    // Async function to fetch hike data
    const fetchHikeData = async (hikeId) => {
      try {
        const hikeData = await fetchBikeTrails(hikeId);
        console.log(hikeData);
        setHike(hikeData);
      } catch (error) {
        console.error("Error fetching hike data:", error);
      }
    };

    if (hikeId !== undefined) {
      const id = parseInt(hikeId);
      fetchHikeData(id);
    }
  }, [hikeId]);

  if (hike === null) {
    return (<div className="card"><Loading className="hike-loading-container"/></div>)
  }
  return (
    <div className="hike-page">
      <div className="card">
        <Maps lat={hike !== null ? hike.lat : ""} lon={hike !== null ? hike.lon : ""} />
        <h1>{hike !== null ? hike.name : ""}</h1>
        <p>{hike !== null ? hike.description : ""}</p>
      </div>
      <div className="card">
        <Directions hikeLatitude={hike !== null ? hike.lat : ""} hikeLongitude={hike !== null ? hike.lon : ""} />
      </div>
      <ScrollToTop className="scroll" smooth color="#5D9C59"  viewBox="256 256 1024 1024"/>
    </div>
  );
};
