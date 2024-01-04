import React, { useContext } from 'react'
import MallContext from '../components/context/mallContext'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

export default function AdminMaps() {

    const {mall,setMall}=useContext(MallContext);


    const handleClick = (event) => {
        const clickedLocation = event.latlng;
        setMall({...mall, coords:[clickedLocation.lat, clickedLocation.lng]})
        console.log('Clicked Location:', clickedLocation);

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

                {/* Attach the click event handler to the map */}
                <MapClickHandler onClick={handleClick} />
            </MapContainer>

            <div id="map" style={{ minHeight: '20px', width: '100%' }}></div>
        </div>
    );
};



