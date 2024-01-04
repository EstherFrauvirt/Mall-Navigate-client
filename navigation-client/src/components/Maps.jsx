// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";



// const MapWithUserLocation = () => {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     // Check if the geolocation API is available
//     if ('geolocation' in navigator) {
//       // Get user's current location
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error('Error getting user location:', error.message);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by your browser');
//     }
//   }, []);

//   return (
//     <MapContainer center={[32.109333, 34.855499]} zoom={12} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {userLocation && (
//         <Marker position={[userLocation.lat, userLocation.lng]}>
//           <Popup>You are here!</Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// };

// export default MapWithUserLocation;



import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

const MapWithRoute = ({ startCoords, endCoords }) => {
  useEffect(() => {
    const map = L.map('map').setView(startCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(startCoords),
        L.latLng(endCoords)
      ],
      routeWhileDragging: true
    }).addTo(map);
  }, [startCoords, endCoords]);

  return (
    <div id="map" style={{ height: '500px', width: '100%' }}></div>
  );
};

export default MapWithRoute;

