import { Alert, TextField, Button, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { fetchData } from '../utils/servises';
import mallContext from '../context/mallContext'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Data({removeStore,showRU, setShowRU, showLeftCorner, setShowLeftCorner,show, showDoor,setShowDoor, setShow, setFormData, formData, elementCol, elementRow, addStoreToMatrix, addDorToMAtrix, addEntranceToMatrix }) {
    const { mall, setStore, store, setStoreArr, storeArr, showStore, setShowStore } = useContext(mallContext);
    const [width, setWidth] = useState('');
    const [widthError, setWidthError] = useState(false);
    const [hight, setHight] = useState('');
    const [hightError, setHightError] = useState(false);


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

    const handleWidthChange = (event) => {
        const value = event.target.value;

        // Validate that the input is an integer
        const isValidWidth = /^\d+$/.test(value);

        setWidthError(!isValidWidth);
        setWidth(value);
    };

    const handleHightChange = (event) => {
        const value = event.target.value;

        // Validate that the input is an integer
        const isValidHight = /^\d+$/.test(value);

        setHightError(!isValidHight);
        setHight(value);
    };
    const isNameUnique = (name) => {
        return !storeArr.includes(name);
    };


    const handleNameValidation = () => {
        const { name } = formData;

        if (name.trim() === '') {
            // Name is empty
            // Handle validation error (e.g., show error message)
            console.log('Name is required');
            return false;
        }

        if (!isNameUnique(name)) {
            // Name is not unique
            // Handle validation error (e.g., show error message)
            console.log('Name must be unique');
            return false;
        }

        // Name is valid
        return true;
    };

    const addStore = () => {
        if (!handleNameValidation()) {
            alert("name is not unique")
        }
        const tmpData = formData;
        tmpData.location.row = elementRow
        tmpData.location.col = elementCol
        tmpData.place_id = mall.placeId
        if (hightError) {
            alert("hight is not valid")
        }
        else if (widthError) {
            alert("width is not valid")
        }
        else if (tmpData.location.row > -1 && tmpData.location.col > -1 && formData.name && formData.type) {
            setShow(true)
            addStoreToMatrix(tmpData);
            setFormData(tmpData);
        } else {
            console.log(tmpData);
            alert("U R missing Something")
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

    const [showDetails, setShowDetails] = useState(true)
    return (
        <div>

            {showDetails && <form >
                <br />
                <Typography sx={{ fontSize: 15 }} color="#4a4cf5" textAlign={'center'} >
                    mall-Height
                </Typography>
                <TextField
                    margin="dense"
                    required
                    id="outlined"
                    label="height"
                    name="height"
                    defaultValue=""
                    onChange={(e) => { handleChange(e), handleHightChange(e) }}
                    error={hightError}
                    helperText={hightError ? 'Please enter a valid integer' : ''}
                />
                <Typography sx={{ fontSize: 15 }} color="#4a4cf5" textAlign={'center'} >
                    mall-width
                </Typography>
                <TextField
                    margin="dense"
                    required
                    id="outlined"
                    label="width"
                    defaultValue=""
                    name='width'
                    onChange={(e) => { handleChange(e), handleWidthChange(e) }}
                    error={widthError}
                    helperText={widthError ? 'Please enter a valid integer' : ''}
                />
                <br />
                <Typography sx={{ fontSize: 15 }} color="#4a4cf5" textAlign={'center'} >
                    mall-name
                </Typography>
                <TextField
                    margin="dense"
                    required
                    id="outlined"
                    label="Name"
                    name="name"
                    defaultValue=""
                    onChange={handleChange}
                />
                <br />
                <Button sx={{ color: '#4a4cf5' }} size="medium" variant='outlined' onClick={() => { setShowLeftCorner(true); setShowDetails(false) }} >OK</Button>
            </form >}
            {/* ! data */}
            {showLeftCorner && <div>
                <Typography color="#4a4cf5">choose the left-top corner</Typography>
                {show && <>{<>{elementCol} , {elementRow}</>}
                    <br />
                    <Button sx={{ color: '#4a4cf5' }} size="medium" variant='outlined' onClick={() => {setShowLeftCorner(false); setShowDoor(true); addStore(); }} >OK</Button>
                </>}
                 {/* !corner */}
            </div>}
            {showDoor && <div><h5 severity="success" >chhose the door</h5>
                <Button sx={{ color: '#4a4cf5' }} size="medium" variant='outlined' onClick={() => { setShowDoor(false);setShowRU(true); addDor();   }}>Submit</Button>
            </div>}
             {/* !door */}
            {showRU && <>
                <Typography color="#4a4cf5">are you sure?</Typography>
            
            <Button sx={{ color: '#4a4cf5' }} size="medium" variant='outlined'
                onClick={() => {
                    console.log(store); setStoreArr((prevStoreArr) => [...prevStoreArr, store]);
                    setShowStore(true)
                    setShowRU(false)
                    setShowDetails(true)
                    setShow(false)
                }}>YES</Button>
                <Button sx={{ color: '#4a4cf5' }} size="medium" variant='outlined' onClick={()=>{removeStore(formData);setShowDetails(true)}}>NO</Button></>}
        </div>
    )
}
