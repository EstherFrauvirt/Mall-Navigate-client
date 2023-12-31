import { Button, Paper } from '@mui/material'
import React from 'react'
import DoorSlidingTwoToneIcon from '@mui/icons-material/DoorSlidingTwoTone';

export default function Cube({ title, color }) {
  return (

    <Button variant="text" disableElevation size='large' style={{ backgroundColor: color, borderRadius: '0' }} square="true">
      {(title === "door" || title === "enter") ? <DoorSlidingTwoToneIcon /> : title}
      </Button>
  )
}
