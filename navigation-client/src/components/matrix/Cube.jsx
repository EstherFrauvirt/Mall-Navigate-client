import { Paper } from '@mui/material'
import React from 'react'

export default function Cube({title}) {
  return (
    <Paper elevation={0}  variant="outlined" square style={{height:"40px",width:"40px"}}>{title}</Paper>

    // <span style={{border:'solid', borderWidth:'2px',borderColor:'black',width:20,height:20,}}>{title|| "  "}</span>
  )
}
