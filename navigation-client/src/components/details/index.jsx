import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function Deteils({ addStoreToMatrix, elementRow, elementCol, addDorToMAtrix, show1, show2 }) {
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
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'locationrow' || name === 'locationcol' ||
                name === 'enterancerow' || name === 'enterancecol'
                ? { ...prevData[name.substring(0, name.length - 3)], [name.slice(-3)]: value }
                : value,
        }));
    };

    const handleChangeEL = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name.substring(0, name.length - 3)]: name === 'locationrow' || name === 'locationcol' ||
                name === 'enterancerow' || name === 'enterancecol'
                ? { ...prevData[name.substring(0, name.length - 3)], [name.slice(-3)]: value }
                : value,
        }));
    };
    const addStore = () => {
        const tmpData = formData;
        tmpData.location.row = elementRow
        tmpData.location.col = elementCol
        if(tmpData.location.row&&tmpData.location.col&& formData.name&& formData.type){
        setShow(true)
        addStoreToMatrix(tmpData);
        setFormData(tmpData);
        }else{
            console.log(tmpData);
            alert("Y R missing Something")
        }
    }
    const addDor = () => {
        const tmpData = formData;
        tmpData.enterance.row = elementRow
        tmpData.enterance.col = elementCol
        console.log("dor", tmpData);
        addDorToMAtrix(tmpData)
        setFormData(tmpData)
    }
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
        <>
            {!show1 && <Alert severity="success" >chhose the left-top corner</Alert>}
            {show1 && <form >
                <br />
                <TextField
                    required
                    id="outlined-required"
                    label="Height"
                    name="height"
                    defaultValue=""
                    onChange={handleChange}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="Width"
                    defaultValue=""
                    name='width'
                    onChange={handleChange}

                />
                <br />
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    name="name"
                    defaultValue=""
                    onChange={handleChange}

                />
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="type"
                        value={formData.type}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"store"}>store</MenuItem>
                        <MenuItem value={"path"}>path</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Button onClick={addStore} >OK</Button>

                {show2 && show && <div><Alert severity="success" >chhose the dor</Alert>
                    <Button onClick={addDor}>Submit</Button>
                </div>}
            </form >}
        </>
    )
}
