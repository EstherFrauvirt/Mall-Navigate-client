import React from 'react'
import { Alert } from 'react-bootstrap'
import { Button } from '@mui/material'

export default function Entrance({ addEntranceToMatrix, elementRow, elementCol }) {
    const addEntrance = () => {
        const tmpData = {
            location: {
                row: '',
                col: '',
                type: ''
            }
        };
        tmpData.location.row = elementRow
        tmpData.location.col = elementCol
        tmpData.type = "entrance"
        addEntranceToMatrix(tmpData)
    }
    return (
        <div>
            <Alert severity="success" >choose the Entrance</Alert>
            <Button onClick={addEntrance}>add Entrance</Button>
        </div>
    )
}