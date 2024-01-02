import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import MallContext from '../context/mallContext';
import {Button,Card,Box,Typography,CardContent,CardActions,TextField} from '@mui/material'
import { Link } from 'react-router-dom'

export default function Size({handleClick}) {
  const { setHeight, setWidth, height, width } = useContext(MallContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Height:', height, 'Width:', width);
    handleClick();

  };

  return (
    <>
      <Card sx={{ minWidth: 275, width: "40%", left: '15%', marginTop: '', position: 'absolute', top: '25%', padding: '20px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">      <CardContent>
          <Typography sx={{ fontSize: 40 }} color="#4a4cf5" textAlign={'center'} >
            Size
          </Typography> <br /><br />

          <form>
            <TextField
              style={{ width: '310px' }}
              variant="outlined" 
              type="number"
              onChange={(e) => setHeight(e.target.value)}
              label="height"
              
              />
              <br/><br/>
            <TextField
              type="number"
              label="width"
              onChange={(e) => setWidth(e.target.value)}
              style={{ width: '310px' }}
              variant="outlined" />
          </form>
        </CardContent>
          <CardActions>
           <Button sx={{ color: '#4a4cf5' }} size="medium"  variant='outlined' onClick={handleSubmit}>Continue</Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}
