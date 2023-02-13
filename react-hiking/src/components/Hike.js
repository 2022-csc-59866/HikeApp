// router
import { Link } from "react-router-dom"

export const Hike = ({hike}) => {
  return (
    <div className="hike" style={{ border: '1px solid #29085B' }}>  
        <center><p style={{ border: '2px solid #29085B' }}>
         <Link to={`/hike/${hike.lon}/${hike.lat}/${hike.city}/${hike.state}/${hike.country}`}>{hike.name}</Link><br/>
          {hike.city}, {hike.state}<br/>
          {hike.country}<br/>
        </p></center>
        <ul>
          <li>Info: {hike.description}</li>
          <li>Longitude: {hike.lon}</li>
          <li>Latitude: {hike.lat}</li>
        </ul>
      </div>
  )
}