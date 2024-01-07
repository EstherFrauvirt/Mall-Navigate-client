import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Data from './Data';
import Path from './Path';
import Entrance from './Entrance';
import { Link } from 'react-router-dom';
import { Label } from '@mui/icons-material';

export default function Deteils({removeStore, setShowRU, showRU, showDoor, setShowDoor, show, setShow, setShowLeftCorner, showLeftCorner, addStoreToMatrix, elementRow, elementCol, addDorToMAtrix, show1, show2, addPathToMatrix, addEntranceToMatrix }) {
    const [formData, setFormData] = useState({
        height: '',
        width: '',
        name: '',
        location: { row: '', col: '' },
        enterance: { row: '', col: '' },
        type: '', // Default type
    });
    const handleChange = (e) => {
        console.log("hii");
        const { name, value } = e.target;
        console.log(name);
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'locationrow' || name === 'locationcol' ||
                name === 'enterancerow' || name === 'enterancecol'
                ? { ...prevData[name.substring(0, name.length - 3)], [name.slice(-3)]: value }
                : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, you can access form data from formData state
        const tmp = formData;
        addDorToMAtrix(tmp);
        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                // Check if the property is not inherited from the prototype chain
                formData[key] = null; // You can set the default value based on your requirements
            }
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Typography>choose what do you want to draw first:</Typography>

            <FormControl style={{ width: "150px" }}>
                <InputLabel >choose</InputLabel>
                <Select
                    sx={{ width: '200spx' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type"
                    value={formData.type}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"store"}>store</MenuItem>
                    <MenuItem value={"path"}>path</MenuItem>
                    <MenuItem value={"entrance"}>entrance</MenuItem>
                </Select>
            </FormControl>
            {formData.type == "store" && <Data
                show={show}
                showLeftCorner={showLeftCorner}
                setShowLeftCorner={setShowLeftCorner}
                showDoor={showDoor}
                setShowDoor={setShowDoor}
                setShow={setShow}
                setFormData={setFormData}
                formData={formData}
                elementRow={elementRow}
                elementCol={elementCol}
                addStoreToMatrix={addStoreToMatrix}
                addDorToMAtrix={addDorToMAtrix}
                showRU={showRU}
                setShowRU={setShowRU} 
                removeStore={removeStore}/>}
            {formData.type == "path" && <Path
                addPathToMatrix={addPathToMatrix}
                elementRow={elementRow}
                elementCol={elementCol} />}
            {formData.type == "entrance" && <Entrance
                addEntranceToMatrix={addEntranceToMatrix}
                elementRow={elementRow}
                elementCol={elementCol} />}
            {/* <Link to="/erase"><Button>UNDO</Button></Link> */}

        </div>
    )
}
