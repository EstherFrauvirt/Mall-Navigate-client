import { Alert, TextField, Button } from '@mui/material'
import React from 'react'

export default function Data({ show1, show2, setShow, setFormData, formData, elementCol, elementRow, addStoreToMatrix, addDorToMAtrix }) {
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


    const addStore = () => {
        // setShow1(true)
        // setShow2(true)
        const tmpData = formData;
        tmpData.location.row = elementRow
        tmpData.location.col = elementCol
        if (tmpData.location.row && tmpData.location.col && formData.name && formData.type) {
            setShow(true)
            addStoreToMatrix(tmpData);
            setFormData(tmpData);
        } else {
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
    return (
        <div>{console.log(show1, show2)}
            {!show1 && <Alert severity="success" >chhose the left-top corner</Alert>}
            {show1 && <form >
                <br />
                <TextField
                    margin="dense"
                    required
                    id="outlined-required"
                    label="Width"// טעות החלפתי בין משתנים
                    name="height"
                    defaultValue=""
                    onChange={handleChange}

                />
                <TextField
                    margin="dense"
                    required
                    id="outlined-required"
                    label="Height"// טעות החלפתי בין משתנים
                    defaultValue=""
                    name='width'
                    onChange={handleChange}

                />
                <br />
                <TextField
                    margin="dense"
                    required
                    id="outlined-required"
                    label="Name"
                    name="name"
                    defaultValue=""
                    onChange={handleChange}

                />
                {/* <FormControl >
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
                </FormControl> */}
                <br />
                <Button onClick={addStore} >OK</Button>

                {show2 && show1 && <div><Alert severity="success" >chhose the dor</Alert>
                    <Button onClick={addDor}>Submit</Button>
                </div>}
            </form >}
        </div>
    )
}
