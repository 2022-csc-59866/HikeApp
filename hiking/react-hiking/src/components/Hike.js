// router
import { Link } from "react-router-dom"

//star component
import {Star} from "./Star"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Maps } from '../components/Maps';

export const Hike = ({hike}) => {
  console.log(hike.lon, hike.lat);
  return (
        <div class="media" >
          <span class="rounded" border="1px solid black">
          <a class="media-left">
            <Maps lon={hike.lon} lat={hike.lat}/>
          </a>
          <div class="media-body">
            <h4 class="media-heading"><Link to={`/hike/${hike.lon}/${hike.lat}/${hike.city}/${hike.state}/${hike.country}`}>{hike.name}</Link><br/></h4>
            <h5 class="media-heading">{hike.city}, {hike.state}, {hike.country}</h5>
            <h5 class="media-heading">Coordinates: {hike.lat}, {hike.lon}</h5>
            {hike.description}
            <right><Star id={hike.id}/></right>
          </div>
          </span>
        </div>
        
  )
}

