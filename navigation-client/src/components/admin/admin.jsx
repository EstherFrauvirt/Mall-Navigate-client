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
  const [flags, setFlags] = useState({
    name: true,
    size: false,
    draw: false,
    create: false
  });


useEffect(() => {
  console.log('useeffctcgvxfdzs');
  setEvents(prevEvents => prevEvents.map(ev => {
    console.log(ev.title.toLowerCase());
    if (flags[`${ev.title.toLowerCase()}`]) {
      ev.color = '#ff8b84';
    } else {
      ev.color = 'secondary';
    }
    return ev;
  }));
 
}, [flags])
useEffect(() => {
  console.log('events');
  
}, [events])


  const handleNameClick = () => {
    console.log("handleClick");
    fetchData();
  
  }
  const fetchData = async () => {
    console.log(mall);
    try {
      console.log("(hii fetch)");
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
        name: false,size:true
      }))
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <>
      <div style={{ height: '90vh' }}>
        <Container>

          <div style={{ position: 'absolute', top: '15%', right: '15%' }}>
            <DynamicTimeline events={events} />
          </div>
          {flags.name && <Name handleClick={handleNameClick} />}
          {flags.size && <Size />}

        </Container>
      </div>
    </>


  )
}
