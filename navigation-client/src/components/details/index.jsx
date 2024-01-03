import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Data from './Data';
import Path from './Path';
import Entrance from './Entrance';
import { Link } from 'react-router-dom';

export default function Deteils({ addStoreToMatrix, elementRow, elementCol, addDorToMAtrix, show1, show2, addPathToMatrix,addEntranceToMatrix }) {
    const [formData, setFormData] = useState({
        height: '',
        width: '',
        name: '',
        location: { row: '', col: '' },
        enterance: { row: '', col: '' },
        type: '', // Default type
    });
    const [show, setShow] = useState()

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

    return ( <> <Typography style={{  fontSize: '20px',
    color: '#4a4cf5',
    maxWidth: '400px',
    wordWrap: 'break-word', // Ensures the text doesn't overflow the container
    textAlign: 'left'}}>welcom to draw and design your mall map
                <br/> choose what do you want to draw first:
            </Typography>
         <FormControl style={{ width: "150px" }}>
          
            <InputLabel >choose</InputLabel>
            <Select
            sx={{width:'200px'}}
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
                show1={show1}
                show2={show2}
                setShow={setShow}
                setFormData={setFormData}
                formData={formData}
                elementRow={elementRow}
                elementCol={elementCol}
                addStoreToMatrix={addStoreToMatrix}
                addDorToMAtrix={addDorToMAtrix} />}
            {formData.type == "path" && <Path
                addPathToMatrix={addPathToMatrix}
                elementRow={elementRow}
                elementCol={elementCol} />}
            {formData.type == "entrance" && <Entrance
                addEntranceToMatrix={addEntranceToMatrix}
                elementRow={elementRow}
                elementCol={elementCol} />}
                {/* <Link to="/erase"><Button>UNDO</Button></Link> */}

        </>
    )
}
