import { Alert, TextField, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { fetchData } from '../utils/servises';
import mallContext from '../context/mallContext'

export default function Data({ show1, show2, setShow, setFormData, formData, elementCol, elementRow, addStoreToMatrix, addDorToMAtrix, addEntranceToMatrix }) {
    const { mall, setStore, store, setStoreArr, storeArr } = useContext(mallContext);
    const [showStore, setShowStore] = useState();
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


    const addStore = () => {
        const tmpData = formData;
        tmpData.location.row = elementRow
        tmpData.location.col = elementCol
        if (hightError){
            alert("hight is not valid")
        }
        else if (widthError){
            alert("width is not valid")
        }
        else if (tmpData.location.row > -1 && tmpData.location.col > -1 && formData.name && formData.type) {
            setShow(true)
            addStoreToMatrix(tmpData);
            setFormData(tmpData);
        } else {
            console.log(tmpData);
            alert("Y R missing Something")
        }

    }

    const addEnter = () => {
        const tmpData = formData;
        tmpData.enterance.row = elementRow
        tmpData.enterance.col = elementCol
        console.log("dor", tmpData);
        addEntranceToMatrix(tmpData)
        setFormData(tmpData)
        // setShowStore(true)       
    }

    const addDor = () => {
        const tmpData = formData;
        tmpData.enterance.row = elementRow
        tmpData.enterance.col = elementCol
        console.log("dor", tmpData);
        addDorToMAtrix(tmpData)
        setFormData(tmpData)
        setShowStore(true)
    }

    const updateStoreArr = (index, updatedObject) => {
        setStoreArr((prevStoreArr) => {
            const newStoreArr = [...prevStoreArr];
            newStoreArr[index] = updatedObject;
            return newStoreArr;
        });
    };

    return (
        <div>{console.log(show1, show2)}
            {!showStore && !show1 && <Alert severity="success" >chhose the left-top corner</Alert>}
            {!showStore && show1 && <form >
                <br />
                <TextField
                    margin="dense"
                    required
                    id="outlined-required"
                    label="Width"// טעות החלפתי בין משתנים
                    name="height"
                    defaultValue=""
                    onChange={(e)=>{handleChange(e), handleHightChange(e)}}
                    error={hightError}
                    helperText={hightError ? 'Please enter a valid integer' : ''}

                />
                <TextField
                    margin="dense"
                    required
                    id="outlined-required"
                    label="Height"// טעות החלפתי בין משתנים
                    defaultValue=""
                    name='width'
                    onChange={(e)=>{handleChange(e), handleWidthChange(e)}}
                    error={widthError}
                    helperText={widthError ? 'Please enter a valid integer' : ''}

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

                <br />
                <Button onClick={addStore} >OK</Button>

                {!showStore && show2 && show1 && <div><Alert severity="success" >chhose the dor</Alert>
                    <Button onClick={addDor}>Submit</Button>
                </div>}
            </form >}
            {showStore && <Button onClick={() => { console.log(store); setStoreArr((prevStoreArr) => [...prevStoreArr, store]); setShowStore(false) }}>R U shure?</Button>}
        </div>
    )
}
