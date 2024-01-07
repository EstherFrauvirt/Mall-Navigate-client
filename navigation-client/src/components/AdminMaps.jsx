import React, { useContext, useState } from 'react'
import MallContext from '../components/context/mallContext'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';

export default function AdminMaps() {

    const { mall, setMall } = useContext(MallContext);
    const [clickedLocation, setClickedLocation] = useState(null);

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776000.png",
        iconSize: [38, 38]
    });


    const handleClick = (event) => {
        const { lat, lng } = event.latlng;
        const clickedLocation = event.latlng;
        setMall({ ...mall, coords: [clickedLocation.lat, clickedLocation.lng] })
        console.log('Clicked Location:', clickedLocation);
        setClickedLocation({ lat, lng });

        // You can use the clickedLocation in your application as needed
    };


    const MapClickHandler = ({ onClick }) => {
        const map = useMapEvents({
            click: (event) => {
                onClick(event);
            },
        });

        return null; // This component doesn't render anything
    };




    return (
        <div>
            <MapContainer center={[32.0813, 34.77616]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {clickedLocation && (
                    <Marker position={[clickedLocation.lat, clickedLocation.lng]} icon={customIcon}></Marker>
                )}
                {/* Attach the click event handler to the map */}
                <MapClickHandler onClick={handleClick} />
            </MapContainer>

            <div id="map" style={{ minHeight: '20px', width: '100%' }}></div>
        </div>
    );
};



