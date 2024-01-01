import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import config from './config';
import { Box, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: ''
  });

  const [passError, setPassError] = useState(false);
  const [inputValue, setInputValue] = useState('');


  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState(false);


  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}users/register`,
        {
          method: 'POST', // specify the HTTP method
          headers: {
            'Content-Type': 'application/json', // specify the content type if sending JSON data
            // Add any additional headers as needed
          },
          body: JSON.stringify(user),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      lcosole.log(error);
    }
  };

  const handlePasswordInput = (e) => {
    const value = event.target.value;

    // Validate that the input is a string and has at least 6 characters
    if (typeof value !== 'string' || value.length < 6) {
      setPassError(true);
    } else {
      setPassError(false);
    }

    setInputValue(value);
  };

  const handleEmailInput = (event) => {
    const value = event.target.value;

    // Updated email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    const isValidEmail = emailRegex.test(value);

    setEmailError(!isValidEmail);
    setEmailValue(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check the validity of the fields
    if (!passError && !emailError) {
      // Fields are valid, proceed with fetching data and navigation
      fetchData();
      navigate("/login");
    } else {
      // Fields are not valid, display an error message or take appropriate action
      console.log('Fields are not valid. Please correct the errors.');
    }
  };

  return (
    <div style={{ height: '90vh' }}>


      <Card sx={{ minWidth: 275, width: "40%", marginLeft: '30%', marginTop: '', position: 'absolute', top: '25%', padding: '20px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">      <CardContent>
          <Typography sx={{ fontSize: 40 }} color="#4a4cf5" textAlign={'center'} >
            REGISTER
              </Typography> <br /><br />

          <Form>
            <TextField
              style={{ width: '310px' }}
              label="Name"
              variant="outlined"
              type='text'
              onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
            <br /><br />
            <TextField
              style={{ width: '310px' }}
              label="Email address"
              variant="outlined"
              type='email'
              onChange={(e) => {
                handleEmailInput(e)
                setUser({ ...user, email: e.target.value })
              }}
              error={emailError}
              helperText={emailError ? 'Please enter a valid Email address' : ''}
              value={emailValue} />
            <br /><br />
            <TextField
              onChange={(e) => {
                handlePasswordInput(e)
                setUser({ ...user, password: e.target.value })
              }}
              error={passError} // Setting the error prop based on the error state
              helperText={passError ? 'Please enter at least 6 characters' : ''}
              value={inputValue}
              style={{ width: '310px' }}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />


            <br />
          </Form>
        </CardContent>
          <CardActions>
            <Button sx={{ color: '#4a4cf5' }} size="medium" onClick={handleSubmit} variant='outlined'>Submit</Button>
          </CardActions>
        </Box>
      </Card>
    </div>
  )
}