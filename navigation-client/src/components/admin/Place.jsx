import React, { useContext, useState } from 'react'
import {Button,Card,Box,Typography,CardContent,CardActions,TextField} from '@mui/material'
import { Link } from 'react-router-dom'
import MallContext from '../context/mallContext'
import AdminMaps from '../AdminMaps'



export default function Place({handleClick}) {
    const {mall,setMall}=useContext(MallContext);
    const [coords, setCoords] = useState();
  return (
    <Card sx={{minHeight:'50%', minWidth: 275, width: "40%", left:'20%', marginTop: '', position: '', top: '25%', padding: '20px' }}>
    <Box display="flex" flexDirection="column" alignItems="center">      <CardContent>
      <Typography sx={{ fontSize: 40 }} color="#4a4cf5" textAlign={'center'} >
Location
      </Typography> <br /><br />

    <AdminMaps />
    </CardContent>
      <CardActions>
      <Button sx={{ color: '#4a4cf5' }} size="medium" onClick={handleClick} variant='outlined'>Continue</Button>
      </CardActions>
    </Box>
  </Card>
  )
}
