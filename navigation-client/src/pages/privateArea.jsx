import React, { useContext, useEffect, useState } from 'react'
import config from '../config';
import UserContext from '../components/context/userContext';
// import {  } from 'react-bootstrap';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
// import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

export default function PrivateArea() {
    const { user } = useContext(UserContext)
    const [mallArr, setMallArr] = useState([])
    const [myMalls, setMyMalls] = useState([])
    const fetchData = async () => {
        let result;
        try {
            const response = await fetch(`${config.BASE_URL}mall`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //   body: JSON.stringify(userState),
                });

            if (!response.ok) {
                setValidUser(false)
                throw new Error('Network response was not ok');

            }
            result = await response.json();
            setMallArr(result)
            console.log(result);
            //   setRes(result);
            console.log(result);
            console.log("user", user._id);
        } catch (error) {
            console.log(error);
        }
    };
const deleteButt =async (mallId)=>{
    console.log("before");
   await deleteMall(mallId)
    fetchData();

    setMallArr((prevMalls) => prevMalls.filter((mall) => mall._id !== mallId));
    console.log("after");

    const updatedMyMalls = mallArr.filter((m) => m.ownerId === user._id);
    setMyMalls(updatedMyMalls);
}
    const deleteMall=async(mallId)=>{
        try {
            console.log("try to delete");

            // Send a DELETE request to delete the mall by ID
            await fetch(`${config.BASE_URL}mall/${mallId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,

                // You may include other headers if needed
              },
            });
            fetchData(); // Replace with your server URL
            // Update the list of malls after deletion
          } catch (error) {
            console.error('Error deleting mall:', error);
          }
          
          console.log(mallArr);
          const myMalls = mallArr.filter((m) => m.ownerId === user._id);
          setMyMalls(myMalls)    }

    useEffect(() => {
        fetchData();
        const myMalls = mallArr.filter((m) => m.ownerId === user._id);
        setMyMalls(myMalls)
        console.log("myMalls", myMalls);
    }, [])
    return (
        <div style={{minHeight:"80vh"}}>
           <h1 style={{textAlign:"center"}}> MY MALLS</h1>
            <div style={{ display: "flex" ,flexWrap:"wrap",justifyContent:"space-around"}}>
                {myMalls?.map((m, i) => {
                    return <Card key={i} style={{ width: "20%" }}>
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
                            <CardContent style={{height:"100px"}}>
                                <Stack style={{display:"flex", justifyContent:"space-around"}} direction={{ xs: 'column', sm: 'row' }}
                                    spacing={5}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {m.name}
                                    </Typography>
                                    <Button size="small" color="primary" onClick={()=>{deleteButt(m._id)}}>
                                        <DeleteIcon/>
                                    </Button>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                })}
            </div></div>
    )
}
