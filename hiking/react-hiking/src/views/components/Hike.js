import 'bootstrap/dist/css/bootstrap.min.css';
import { Maps } from '../components/Maps';
import "./Hike.css";

// router
import { Link } from "react-router-dom"

export const Hike = ({hike}) => {

  console.log(hike.lon, hike.lat);
  return (
        <div class="media" >
          <span class="rounded" border="1px solid black">
          <a class="media-left">
            {hike.thumbnail ? (
            <img src={hike.thumbnail} alt="Hike Thumbnail" />
          ) : (
            <Maps lon={hike.lon} lat={hike.lat} />
          )}

          </a>
          <div class="media-body">
            <h4 class="media-heading"><Link className="link" to={`/hike/${hike.id}`}>{hike.name}</Link><br/></h4>
            <h5 class="media-heading">{hike.city}, {hike.region}, {hike.country}</h5>
            <h5 class="media-heading">Coordinates: {hike.lat}, {hike.lon}</h5>
            <h5 class="media-heading">Length: {hike.miles}</h5>
          </div>
          </span>
        </div>
  )
}