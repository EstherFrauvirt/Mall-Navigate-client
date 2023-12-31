import React, { useContext, useState, useEffect } from 'react'
import AppRoutes from '../routers/appRouters'
import { Link } from 'react-router-dom'
import config from '../../config';
import { useNavigate, useLocation } from 'react-router-dom';
import mallContext from '../context/mallContext'
import Form from 'react-bootstrap/Form';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AbcRoundedIcon from '@mui/icons-material/AbcRounded';
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import ShapeLineRoundedIcon from '@mui/icons-material/ShapeLineRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';


import DynamicTimeline from '../dynamicTimeLine';
import { Card, Box, CardContent, Typography, TextField, CardActions, Button, Container } from '@mui/material';
import { height } from '@mui/system';
import Name from './name';
import CampSize from '../details/campSize';
import Size from './Size';
import BuildMatrix from '../buildMatrix';
import Place from './Place';
import Created from '../../pages/created';


const eventsArr = [
  {
    icon: <LocationOnRoundedIcon />,
    title: 'Location',
    description: 'Choose a location in the map',
    color: '#ff8b84'
  },
  {
    icon: <AbcRoundedIcon />,
    title: 'Name',
    description: 'Choose name to your mall',
    color: 'primary'
  },
  {
    icon: <AspectRatioRoundedIcon />,
    title: 'Size',
    description: 'Give width and height to your mall',
    color: 'primary',
  },
  {
    icon: <ShapeLineRoundedIcon />,
    title: 'Draw',
    description: 'Design and draw your mall',
    color: 'primary'
  },
  {
    icon: <AddCircleRoundedIcon />,
    title: 'Create',
    description: 'Enter your mall to the application',
    color: 'primary',
  },
];

export default function Admin() {
  const { isValidName, setIsValidName } = useState(true);
  const { mall, setMall } = useContext(mallContext)
  const [events, setEvents] = useState(eventsArr);
  const [timeline, setTimeline] = useState({
    location: true,
    name: false,
    size: false,
    draw: false,
    create: false
  });
  const [flags, setFlags] = useState({
    location: true,
    name: false,
    size: false,
    draw: false,
    create: false
  });


  useEffect(() => {

    setEvents(prevEvents => prevEvents.map(ev => {
      if (timeline[`${ev.title.toLowerCase()}`]) {
        ev.color = '#ff8b84';
      } else {
        ev.color = 'grey';
      }
      return ev;
    }));

  }, [flags])

  useEffect(() => {
    return () => {
      setEvents([...eventsArr])
    }
  }, [])


  const handleNameClick = () => {
    fetchData();

  }
  const handleCreateClick = () => {
    setFlags((prevflags) => ({
      ...prevflags,
      create: true,draw:false

    }))
    setTimeline((prev) => ({
      ...prev,
      create: true
    }))
  }
  const handleSizeClick = () => {
    setFlags((prevflags) => ({
      ...prevflags,
      draw: true, size: false

    }))
    setTimeline((prev) => ({
      ...prev, draw: true
    }))

  }

  const handlePlaceClick = () => {
    setFlags((prevflags) => ({
      ...prevflags,
      name: true, location: false

    }))
    setTimeline((prev) => ({
      ...prev, name: true
    }))

  }
  const fetchData = async () => {
    console.log(mall);
    try {
      const response = await fetch(`${config.BASE_URL}mall`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(mall),
        });

      if (!response.ok) {
        console.log(response);
        setIsValidName(false)
        throw new Error('Make sure name is unique');
      }
      const result = await response.json();
      console.log("result", result);
      setMall({ ...mall, placeId: result.id })
      setFlags((prevflags) => ({
        ...prevflags,
        size: true, name: false

      }))
      setTimeline((prev) => ({
        ...prev,
        size: true
      }))
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <>
      <div style={{ minHeight: '120vh' }}>
        <Container>

          {flags.location && <Place handleClick={handlePlaceClick} />}
          {flags.name && <Name isValidName={isValidName} handleClick={handleNameClick} />}
          {flags.size && <Size handleClick={handleSizeClick} />}
          {flags.draw && <BuildMatrix handleCreateClick={handleCreateClick} />}
          {flags.create && <Created  />}
          <div style={{ position: 'absolute', top: '15%', right: '0%', maxWidth: "40%" }}>
            <DynamicTimeline events={events} />
          </div>
        </Container>
      </div>
    </>


  )
}
