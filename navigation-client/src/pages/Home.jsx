import React from 'react';
import Login from '../components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, styled, Stack, Modal, Button } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import AddUser from '../components/addUser';




const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
}));
export default function Home() {


  return (

    <>
      
      <Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent={'space-around'} >
          <div className='col-12 col-sm-6'>
            <img style={{ width: '100%' }} src={`../../images/main-pic.jpg`} />
          </div>
          <div className='col-12 col-sm-6 d-flex align-items-center' style={{ backgroundColor: '', boxSizing: 'border-box' }}>
            <div className='text-center'>
              <Typography color="#4a4cf5" variant="h1">Lorem ipsum </Typography>
              <Typography color='#4a4cf5' variant="h2">Lorem ipsum dolor sit.</Typography>
            </div>

          </div>
        </Stack>
      </Box>
     
      

      



    </>

  );
}
