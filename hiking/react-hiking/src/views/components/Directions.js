import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getBrowserLocation } from '../../services/getBrowserLocation';
import './Directions.css';

const GOOGLE_MAPS_EMBED_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY;

let isMapsAPILoaded = false;

export function Directions({ hikeLatitude, hikeLongitude }) {
  const [hikeLocation, setHikeLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);


  const [isReady, setIsReady] = useState(false);

  const mapContainerRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const directionsOptions = {
    destination: currentLocation,
    origin: hikeLocation,
    travelMode: 'DRIVING'
  };

  function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_EMBED_API_KEY}&libraries=places`;
    script.defer = true;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }

  function initMap() {
    const hikeLocation = new window.google.maps.LatLng(hikeLatitude, hikeLongitude);
    const mapOptions = {
      zoom: 7,
      center: hikeLocation
    };

    const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);

    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
    directionsRendererRef.current.setMap(map);
    directionsRendererRef.current.setPanel(document.getElementById('directionsPanel'));

    setIsReady(true);
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
    if (isReady && currentLocation && hikeLocation) {
      calcRoute(currentLocation, hikeLocation);
    }
  }, [isReady, currentLocation, hikeLocation, calcRoute]);

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
      <div id='directionsPanel' className='directionsPanel'>
        <div className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
          {/* Content of the expandable element */}
          <h3>Directions</h3>
          <ul id='expandedButton'>
            {directions && directions.routes && directions.routes.length > 0 && (
              directions.routes[0].legs.map((leg, index) => (
                <li key={index}>
                  <strong>Step {index + 1}:</strong> {leg.distance.text}, {leg.duration.text}<br />
                  {leg.instructions}
                </li>
              ))
            )}
          </ul>
        </div>
        <button onClick={handleExpand}>{isExpanded ? 'Collapse' : 'Expand'}</button>
      </div>
    </div>
  );
  
}
