import UserContext from '../components/context/userContext';
import config from '../config';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect, useContext } from 'react';

const PrivateArea = () => {
    const { user } = useContext(UserContext)

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from your Node.js server
        fetch(`${config.BASE_URL}mall`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Filter the data by ownerId (assuming 'user1' for demonstration)
                const filteredData = data.filter(item => item.ownerId === user.id);
                setData(filteredData);
            })
            .catch(error => console.error('Error fetching data:', error));
        console.log(data);
    }, []); // Empty dependency array for a one-time fetch when the component mounts

    const handleDelete = (id) => {
        // Perform the delete operation by sending a DELETE request to your Node.js server
        fetch(`${config.BASE_URL}mall/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // If the delete operation is successful, update the state to reflect the change
                setData(prevData => prevData.filter(item => item._id !== id));
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    return (
        <div style={{ minHeight: "80vh" }}>
            <h1 style={{ textAlign: "center" }}> MY MALLS</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>

                {data.length != 0 ?
                    data?.map((m, i) => {
                        return <Card key={i} style={{ width: "21%" ,marginBottom:"10px"}}>
                            <CardActionArea style={{ height: "300px" }}>
                                <CardMedia >
                                    {console.log(m.coords)}
                                    <MapContainer
                                        center={[m.coords[0], m.coords[1]]}
                                        zoom={20}
                                        style={{ height: '200px', width: '100%' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <Marker
                                            position={[m.coords[0], m.coords[1]]}
                                        >
                                        </Marker>
                                    </MapContainer>
                                </CardMedia>
                                <CardContent height={{ sx: "50px", sm: "100px" }}>
                                    <Stack style={{ display: "flex", justifyContent: "space-around" }} direction={{ xs: 'column', sm: 'row' }}
                                        spacing={5}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {m.name}
                                        </Typography>
                                        <Button size="small" color="primary" onClick={() => { handleDelete(m._id) }}>
                                            <DeleteIcon />
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    }) : <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                        <img src="../../images/Wavy_Bus-26_Single-11.jpg" style={{ width: "600px", height: "70vh", flex: "1" }} />
                        <Typography sx={{ color: '#4a4cf5', position: "absolute", top: "50%", left: "0%", transform: "translate(-50%, -50%)", background: " #ff8e889c", borderRadius: "10px", padding: "20px" }}>
                            <h1 >malls dont found</h1>
                        </Typography>
                    </div>}
            </div></div>
    );;
}

export default PrivateArea;
