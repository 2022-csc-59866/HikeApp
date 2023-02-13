// router
import { Link } from "react-router-dom"

export const Hike = ({hike}) => {
  return (
    <div className="hike" style={{ border: '1px solid #29085B' }}>  
        <p style={{ border: '2px solid #29085B' }}>
         <Link to={`/hike/${hike.name}`}><center> {hike.name}</center></Link>
          <center> {hike.city}</center>
          <center> {hike.state}</center>
        </p>
        <ul>
          <li>Info: {hike.description}</li>
          <li>Longitude: {hike.lon}</li>
          <li>Latitude: {hike.lat}</li>
        </ul>
      </div>
  )
}