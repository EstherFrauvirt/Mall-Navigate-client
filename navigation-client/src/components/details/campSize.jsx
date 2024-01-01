import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';



export default function CampSize() {
  const location = useLocation();
  const { state } = location;
  console.log(state);

  const [height, setHeight] = useState('');
  const [hightError, setHightError] = useState(false);
  const [widthError, setWidthError] = useState(false);
  const [width, setWidth] = useState('');

  const navigate = useNavigate();


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
    setHeight(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hightError) {
      alert("hight is not valid")
    }
    else if (widthError) {
      alert("width is not valid")
    }
    else {
      navigate(`/buildMatrix?height=${height}&width=${width}&mall=${state}`)
      // You can use height and width values as needed (e.g., send them to the server, perform calculations, etc.)
      console.log('Height:', height, 'Width:', width);
    }
  };

  return (
    <div>
      <h3>enter hi</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          required
          id="outlined-required"
          label="Hight"// טעות החלפתי בין משתנים
          name="height"
          defaultValue=""
          onChange={(e) => { setHeight(e.target.value), handleHightChange(e) }}
          error={hightError}
          helperText={hightError ? 'Please enter a valid integer' : ''}

        />
        <br />
        <TextField
          margin="dense"
          required
          id="outlined-required"
          label="Width"// טעות החלפתי בין משתנים
          name="width"
          defaultValue=""
          onChange={(e) => { setWidth(e.target.value), handleWidthChange(e) }}
          error={widthError}
          helperText={widthError ? 'Please enter a valid integer' : ''}

        />
        <br />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
}
