import React, { useEffect, useState } from 'react'

export default function Deteils({ addElementToMatrix, elementRow, elementCol }) {
    const [formData, setFormData] = useState({
        height: '',
        width: '',
        name: '',
        location: { row: '', col: '' },
        enterance: { row: '', col: '' },
        type: 'store', // Default type
    });
    const [show, setShow] = useState()
    const [firstClick, setFirsClick] = useState()
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
    const nowDor = () => {
        // if(!firstClick){
        setFormData((prevFormData) => ({
            ...prevFormData,
            location: {
                ...prevFormData.location,
                ["row"]: elementRow
            }
        }));
        setFormData((prevFormData) => ({
            ...prevFormData,
            location: {
                ...prevFormData.location,
                ["col"]: elementCol
            }
        }));
        // }
        // else{

        // }
        setShow(true)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData((prevFormData) => ({
            ...prevFormData,
            enterance: {
                ...prevFormData.enterance,
                ["row"]: elementRow
            }
        }));
        setFormData((prevFormData) => ({
            ...prevFormData,
            enterance: {
                ...prevFormData.enterance,
                ["col"]: elementCol
            }
        }));
        // Handle form submission, you can access form data from formData state
        addElementToMatrix(formData);
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

                {/* <label>
                    Location - Row:
                    <input
                        type="number"
                        name="locationrow"
                        value={formData.location?.row}
                        onChange={handleChangeEL}
                    />
                </label>
                <label>
                    Location - Col:
                    <input
                        type="number"
                        name="locationcol"
                        value={formData.location?.col}
                        onChange={handleChangeEL}
                    />
                </label>
                <br /> */}

                {/* <label>
                    enterance - Row:
                    <input
                        type="number"
                        name="enterancerow"
                        value={formData.enterance.row}
                        onChange={handleChangeEL}
                    />
                </label>
                <label>
                    enterance - Col:
                    <input
                        type="number"
                        name="enterancecol"
                        value={formData.enterance.col}
                        onChange={handleChangeEL}
                    />
                </label> */}
                <br />

                <label>
                    Type:
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="store">Store</option>
                        <option value="transition">Transition</option>
                    </select>
                </label>
                <br />
                <button onClick={nowDor}>OK</button>

                {show && <div><h3>choose dor</h3>
                    <button type="submit">Submit</button>
                </div>
                }</form>
        </>
    )
}
