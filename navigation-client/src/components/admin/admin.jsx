import React, { useContext, useState ,useEffect} from 'react'
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


import DynamicTimeline from '../dynamicTimeLine';
import { Card, Box, CardContent, Typography, TextField, CardActions, Button, Container } from '@mui/material';
import { height } from '@mui/system';
import Name from './name';
import CampSize from '../details/campSize';
import Size from './Size';
import BuildMatrix from '../buildMatrix';

const eventsArr= [
  {
    icon: <AbcRoundedIcon />,
    title: 'Name',
    description: 'Choose name to your mall',
    color: '#ff8b84'
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
  const { mall, setMall } = useContext(mallContext)
  const [events, setEvents] = useState(eventsArr);
  const [timeline, setTimeline] = useState({
    name: true,
    size: false,
    draw: false,
    create: false
  });
  const [flags, setFlags] = useState({
    name: true,
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
  const handleCreateClick=()=>{
    setFlags((prevflags) => ({
      ...prevflags,
      create:true,draw:false
      
    }))
    setTimeline((prev) => ({
      ...prev,
      create:true
    }))
  }
  const handleSizeClick = () => {
    setFlags((prevflags) => ({
      ...prevflags,
      draw:true,size:false
      
    }))
    setTimeline((prev) => ({
      ...prev,draw:true
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
        throw new Error('Make sure name is unique');
      }
      const result = await response.json();
      console.log("result", result);
      setMall({ ...mall, placeId: result.id })
      setFlags((prevflags) => ({
        ...prevflags,
         size:true,name:false
        
      }))
      setTimeline((prev) => ({
        ...prev,
       size:true
      }))
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <>
      <div style={{ minHeight: '90vh' }}>
        <Container>
          <div style={{ position: 'absolute', top: '15%', right:'7%' }}>
            <DynamicTimeline events={events} />
          </div>
          {flags.name && <Name handleClick={handleNameClick} />}
          {flags.size && <Size handleClick={handleSizeClick} />}
        { flags.draw && <BuildMatrix handleCreateClick={handleCreateClick}/>}

        </Container>
      </div>
    </>


  )
}
