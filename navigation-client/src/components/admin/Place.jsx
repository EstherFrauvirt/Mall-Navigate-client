import React, { useContext, useState } from 'react'
import { Button, Card, Box, Typography, CardContent, CardActions, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import MallContext from '../context/mallContext'
import AdminMaps from '../AdminMaps'



export default function Place({ handleClick }) {
  const { mall, setMall } = useContext(MallContext);
  const [coords, setCoords] = useState();
  return (
    <Card sx={{ minWidth: 275, width: "60%", marginLeft: '10%', minHeight: '400px', marginTop: '2%', position: '', marginBottom: '2%', padding: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center" width={'100%'}>
        <CardContent sx={{ width: '100%' }}>
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
