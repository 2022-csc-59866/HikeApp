import 'bootstrap/dist/css/bootstrap.min.css';
import { Maps } from '../components/Maps';
import "./Hike.css";

// router
import { Link } from "react-router-dom"

export const Hike = ({hike}) => {
  return (
        <div className="media" >
          <span className="rounded" border="1px solid black">
          <a className="media-left">
            {hike.thumbnail ? (
            <img src={hike.thumbnail} alt="Hike Thumbnail" />
          ) : (
            <Maps lon={hike.lon} lat={hike.lat} />
          )}

          </a>
          <div className="media-body">
            <h4 className="media-heading"><Link className="link" to={`/hike/${hike.apiId}`}>{hike.name}</Link><br/></h4>
            <h5 className="media-heading">{hike.city}, {hike.state}, {hike.country}</h5>
            <h5 className="media-heading">Coordinates: {hike.lat}, {hike.lon}</h5>
            <h5 className="media-heading">Length: {hike.miles}</h5>
          </div>
          </span>
        </div>
  )
}