import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import MallContext from '../context/mallContext';
import {Button,Card,Box,Typography,CardContent,CardActions,TextField} from '@mui/material'
import { Link } from 'react-router-dom'

export default function CampSize() {
  const { setHeight, setWidth, height, width } = useContext(MallContext);

  const [hightError, setHightError] = useState(false);
  const [widthError, setWidthError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hightError) {
      alert("hight is not valid")
    }
    else if (widthError) {
      alert("width is not valid")
    }
    else {
      navigate(`/buildMatrix?height=${height}&width=${width}&mall=${state}`)
      // You can use height and width values as needed (e.g., send them to the server, perform calculations, etc.)
      console.log('Height:', height, 'Width:', width);
    }
    console.log('Height:', height, 'Width:', width);
  };

  const handleWidthChange = (event) => {
    const value = event.target.value;

    // Validate that the input is an integer
    const isValidWidth = /^\d+$/.test(value);

    setWidthError(!isValidWidth);
    setWidth(value);
  };

  const handleHightChange = (event) => {
    const value = event.target.value;

    // Validate that the input is an integer
    const isValidHight = /^\d+$/.test(value);

    setHightError(!isValidHight);
    setHeight(value);
  };

  return (
    <>
      <Card sx={{ minWidth: 275, width: "40%", left: '15%', marginTop: '', position: 'absolute', top: '25%', padding: '20px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">      <CardContent>
          <Typography sx={{ fontSize: 40 }} color="#4a4cf5" textAlign={'center'} >
            Size
          </Typography> <br /><br />

        
          <TextField
          margin="dense"
          required
          id="outlined-required"
          label="Hight"// טעות החלפתי בין משתנים
          name="height"
          defaultValue=""
          onChange={(e) => { setHeight(e.target.value), handleHightChange(e) }}
          error={hightError}
          helperText={hightError ? 'Please enter a valid integer' : ''}

        />
        <br />
        <TextField
          margin="dense"
          required
          id="outlined-required"
          label="Width"// טעות החלפתי בין משתנים
          name="width"
          defaultValue=""
          onChange={(e) => { setWidth(e.target.value), handleWidthChange(e) }}
          error={widthError}
          helperText={widthError ? 'Please enter a valid integer' : ''}

        />
    
            {/* <TextField
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              style={{ width: '310px' }}
              variant="outlined" /> */}
    
        </CardContent>
          <CardActions>
            <Link to={"/admin/campSize"}> <Button sx={{ color: '#4a4cf5' }} size="medium"  variant='outlined' onClick={handleSubmit}>Continue</Button></Link>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}
