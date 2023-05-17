import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Directions.css';

//components 
import Loading from '../Loading/Loading';

//services
import { getBrowserLocation } from '../../../services/getBrowserLocation';

const GOOGLE_MAPS_EMBED_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY;

let isMapsAPILoaded = false;

export function Directions({ hikeLatitude, hikeLongitude }) {
  const [hikeLocation, setHikeLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const mapContainerRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_EMBED_API_KEY}&libraries=places`;
    script.defer = true;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }

  function initMap() {
    const newYork = new window.google.maps.LatLng(40.7128,-74.0060);
    const mapOptions = {
      zoom: 10,
      center: newYork
    };

    const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);

    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
    directionsRendererRef.current.setMap(map);
    directionsRendererRef.current.setPanel(document.getElementById('directionsPanel'));

    setIsMapReady(true);
  }

  const calcRoute = useCallback((origin, destination) => {
    const selectedMode = document.getElementById('mode').value;
    const request = {
      origin: `${origin.lat},${origin.lng}`,
      destination: `${destination.lat},${destination.lng}`,
      travelMode: window.google.maps.TravelMode[selectedMode]
    };

    directionsServiceRef.current.route(request, function (response, status) {
      if (status === 'OK') {
        directionsRendererRef.current.setDirections(response);
        setDirections(response);
      } else if (status === 'ZERO_RESULTS') {
        return(<div>No directions availble</div>);
      }
    });
  }, []);

  useEffect(() => {
    if (!isMapsAPILoaded) {
      isMapsAPILoaded = true;
      loadGoogleMapsAPI();
    }

    Promise.all([getBrowserLocation(), Promise.resolve({ lat: hikeLatitude, lng: hikeLongitude })])
      .then(([browserLocation, hikeLocation]) => {
        setCurrentLocation(browserLocation);
        setHikeLocation(hikeLocation);
      })
      .catch((error) => {
        console.error('Error getting browser location:', error);
      });
  }, [hikeLatitude, hikeLongitude]);

  useEffect(() => {
    if (isMapReady && currentLocation && hikeLocation) {
      calcRoute(currentLocation, hikeLocation);
    }
  }, [isMapReady, currentLocation, hikeLocation, calcRoute]);

  return (
    <div>
      <div className='card' style={{ display: 'flex', justifyContent: 'center' }}>
        <strong>Mode of Travel: </strong>
        <select id="mode" onChange={() => calcRoute(currentLocation, hikeLocation)}>
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
      </div>
      <div className='map-container' ref={mapContainerRef} style={{ height: '400px', width: '400px', justifyContent: 'center' }}></div>
      <h3>Directions</h3>
      <div id='directionsPanel' className='directionsPanel'>
        <ul>
          {directions &&
          directions.routes &&
          directions.routes.length > 0 ? (
            <>
              {directions.routes[0].legs.map((leg, index) => (
                <li key={index}>
                  {leg.distance.text}, {leg.duration.text}<br />
                  {leg.instructions}
                </li>
              ))}
            </>
          ) : (
            <div className="loading-directions"><Loading /> </div>
          )}
        </ul>
      </div>
    </div>
  );
  
}
