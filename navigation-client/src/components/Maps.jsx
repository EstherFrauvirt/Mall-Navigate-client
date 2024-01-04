import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { useMapEvents, Marker, Popup } from 'react-leaflet';



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
    <div>

      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default MapWithRoute;

