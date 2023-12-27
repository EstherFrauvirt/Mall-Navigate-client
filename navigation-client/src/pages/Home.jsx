import React from 'react';
import Login from '../components/Login';
import './Home.css'
import ResponsiveAppBar from '../components/navBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Home() {
    return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="xl">
    <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ bgcolor: '', height: '100vh' }} />
    </Container>
  </React.Fragment>
  
    );
}
