import React from 'react'
import { Alert } from 'react-bootstrap'
import { Button } from '@mui/material'

export default function Path({ addPathToMatrix, elementRow, elementCol }) {
  const addPath = () => {
    const tmpData = {
      location: {
        row: '',
        col: '',
        type: ''
      }
    };
    tmpData.location.row = elementRow
    tmpData.location.col = elementCol
    tmpData.type = "path"
    addPathToMatrix(tmpData)
  }
  return (
    <div>
      <Alert severity="success" >choose the area for path</Alert>
      <Button sx={{ color: '#4a4cf5' }} size="medium"  variant='outlined'  onClick={addPath}>add path</Button>
    </div>
  )
}
