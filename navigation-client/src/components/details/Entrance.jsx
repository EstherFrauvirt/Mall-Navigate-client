import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Button, TextField } from '@mui/material'

export default function Entrance({ addEntranceToMatrix, elementRow, elementCol }) {
    const [name, setName] = useState('');

    const addEntrance = () => {
        const tmpData = {
            name:'',
            type: '',
            location: {
                row: '',
                col: '',
                
            }
        };
        tmpData.location.name = name
        tmpData.location.row = elementRow
        tmpData.location.col = elementCol
        tmpData.type = "entrance"
        addEntranceToMatrix(tmpData)
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
      };
    return (
        <div>
            <Alert severity="success" >choose the Entrance</Alert>
            <TextField
                    margin="dense"
                    required
                    id="outlined-required"
                    label="Name"
                    name="name"
                    defaultValue=""
                    onChange={handleNameChange}

                />

            <Button onClick={addEntrance}>add Entrance</Button>
        </div>
    )
}