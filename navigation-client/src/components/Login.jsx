import React, { useState, useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import config from './config';
import { Paper, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';




export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [res, setRes] = useState("")


  const [passError, setPassError] = useState(false);
  const [inputValue, setInputValue] = useState('');


  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState(false);


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (res) {
      navigate(`/admin?res=${res}`)
      localStorage.setItem("token", res.token)
    }
  }, [res])

  const fetchData = async () => {
    let result;
    try {

      const response = await fetch(`${config.BASE_URL}users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      result = await response.json();
      console.log(result);
      setRes(result);

      console.log(result);
    } catch (error) {
      console.log(error);
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

    // Validate that the email contains '@gmail.com'
    const isValidEmail = value.toLowerCase().includes('com');

    setEmailError(!isValidEmail);
    setEmailValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    console.log(res);
  };

  return (
    <>
      <div style={{ height: '90vh' }}>


        <Card sx={{ minWidth: 275, width: "40%", marginLeft: '30%', marginTop: '', position: 'absolute', top: '25%', padding: '20px' }}>
          <Box display="flex" flexDirection="column" alignItems="center">      <CardContent>
            <Typography sx={{ fontSize: 40 }} color="#4a4cf5" textAlign={'center'} >
              LOGIN
        </Typography> <br /><br />

            <Form>
              <TextField
                style={{ width: '310px' }}
                label="Email address"
                variant="outlined"
                type='email'
                onChange={(e) => {
                  handleEmailInput()
                  setUser({ ...user, email: e.target.value })
                }}
                error={emailError}
                helperText={emailError ? 'Please enter a valid Email address' : ''}
                value={emailValue} />
              <br /><br />
              <TextField
                onChange={(e) => {
                  handlePasswordInput()
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

              <a style={{ textAlign: 'center', textDecorationLine: 'none', color: '#4a4cf5' }} href="/register">new user? register</a>
            </Form>
          </CardContent>
            <CardActions>
              <Button sx={{ color: '#4a4cf5' }} size="medium" onClick={handleSubmit} variant='outlined'>Submit</Button>
            </CardActions>
          </Box>
        </Card>
      </div>
    </>
  );
}