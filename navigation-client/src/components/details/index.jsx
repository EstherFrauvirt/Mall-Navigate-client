import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function Deteils({ addStoreToMatrix, elementRow, elementCol, addDorToMAtrix }) {
    const [formData, setFormData] = useState({
        height: '',
        width: '',
        name: '',
        location: { row: '', col: '' },
        enterance: { row: '', col: '' },
        type: 'store', // Default type
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
        setShow(true)
        addStoreToMatrix(tmpData);
        setFormData(tmpData);

    }
    const addDor = () => {
        const tmpData = formData;
        tmpData.enterance.row = elementRow
        tmpData.enterance.col = elementCol
        console.log("dor", tmpData);
        addStoreToMatrix(tmpData)
        setFormData(tmpData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, you can access form data from formData state
        addDorToMAtrix(formData);
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Height:
                    <input
                        type="text"
                        name="height"
                        //   value={formData.height}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <label>
                    Width:
                    <input
                        type="text"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Type:
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="store">Store</option>
                        <option value="transition">Transition</option>
                    </select>
                </label>
                <br />
                <Button onClick={addStore}>OK</Button>

                {show && <div><span>choose dor</span>
                    <Button onClick={addDor}>Submit</Button>
                </div>
                }</form>
        </>
    )
}
