import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBikeTrails } from "../../services/fetchBikeTrails";
import { Directions } from '../components/Directions';
import { Maps } from '../components/Maps';
import Loading  from '../components/Loading';

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
    </div>
  );
};
