import 'bootstrap/dist/css/bootstrap.min.css';
import { Maps } from '../components/Maps';
import { FlaskGetHookUp } from "./FlaskGetHookUp";
import "./Hike.css";

// router
import { Link } from "react-router-dom"

export const Hike = ({hike}) => {

  console.log(hike.lon, hike.lat);
  return (
        <div class="media" >
          <span class="rounded" border="1px solid black">
          <a class="media-left">
            <Maps lon={hike.lon} lat={hike.lat}/>
          </a>
          <div class="media-body">
            <h4 class="media-heading"><Link className="link" to={`/hike/${hike.lon}/${hike.lat}/${hike.city}/${hike.state}/${hike.country}`}>{hike.name}</Link><br/></h4>
            <h5 class="media-heading">{hike.city}, {hike.state}, {hike.country}</h5>
            <h5 class="media-heading">Coordinates: {hike.lat}, {hike.lon}</h5>
            {hike.description}
            {/* <right><Star id={hike.id}/></right> */}
            {/* <right><FlaskGetHookUp/></right> */}
          </div>
          </span>
        </div>
  )
}