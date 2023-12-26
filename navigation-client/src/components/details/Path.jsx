import React from 'react'
import { Alert } from 'react-bootstrap'
import { Button } from  '@mui/material'

export default function Path({addPathToMatrix,elementRow,elementCol}) {
      const addPath = () => {
        const tmpData={
            location:{
                row:'',
                col:'',
                type:''
            }
        } ;
        tmpData.location.row = elementRow
        tmpData.location.col = elementCol
tmpData.type = "path"
        addPathToMatrix(tmpData)
    }
  return (
    <div>
        <Alert severity="success" >choose the area for path</Alert>
        <Button onClick={addPath}>add path</Button>
    </div>
  )
}
