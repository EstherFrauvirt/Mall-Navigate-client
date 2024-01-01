import React, { useContext } from 'react'
import {Button,Card,Box,Typography,CardContent,CardActions,TextField} from '@mui/material'
import { Link } from 'react-router-dom'
import MallContext from '../context/mallContext'

export default function Name({handleClick}) {
    const {mall,setMall}=useContext(MallContext);
  return (
    <Card sx={{ minWidth: 275, width: "40%", left:'15%', marginTop: '', position: 'absolute', top: '25%', padding: '20px' }}>
    <Box display="flex" flexDirection="column" alignItems="center">      <CardContent>
      <Typography sx={{ fontSize: 40 }} color="#4a4cf5" textAlign={'center'} >
        Name
      </Typography> <br /><br />

      <form>
        <TextField
          style={{ width: '310px' }}
          label="Mall name" variant="outlined" type='text' onChange={(e) => { setMall({...mall, name: e.target.value}) }} />
      </form>
    </CardContent>
      <CardActions>
      <Button sx={{ color: '#4a4cf5' }} size="medium" onClick={handleClick} variant='outlined'>Create</Button>
      </CardActions>
    </Box>
  </Card>
  )
}
