import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography, styled, Stack, Modal, Button } from '@mui/material';
import {  useNavigate } from "react-router-dom";
import LoginContext from '../components/context/loginContext';
import ModalContext from '../components/context/modalContext';
import GlobalModal from '../components/modal';





const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
}));

export default function Home() {
  const navigate=useNavigate();
  const {isLogin}=useContext(LoginContext);
  const {handleOpen}=useContext(ModalContext);
  const {role, setRole}=useContext(ModalContext);

  useEffect(() => {

    if (role === 'admin') {
      navigate(`/admin`)
      setRole('')
    }

    else if (role === 'user') {
      navigate(`/create`)
      setRole('')

    }

  }, [role])

  const letsStartHandle=()=>{
    if(isLogin){
      handleOpen();
    }
    else{
      navigate('/login')
    }

  }
  return (

    <>
      <Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent={'space-around'} >
          <div className='col-12 col-sm-6'>
            <img style={{ width: '100%' }} src={`../../images/main-pic.jpg`} />
          </div>
          <div className='col-12 col-sm-6 d-flex align-items-center' style={{ backgroundColor: '', boxSizing: 'border-box' }}>
            <div className='text-center'>
              <Typography color="#4a4cf5" variant="h1">NAV<span  style={{ fontFamily:'Mansalva, sans-serif' }}>it</span> </Typography>
              <Typography color='#4a4cf5' variant="h4">Plan Smarter - Shop Faster</Typography>
              <Button variant="outlined" size='large'
               sx={{
                color:"#ff8e88",border:'solid 1px #ff8e88', marginTop:'20px',
                "&:hover": {
                  backgroundColor: '#ff8e88',
                  color: 'white',
                  border:'none'

                }
              }}
              onClick={letsStartHandle}
                >Let's Start</Button>
            </div>

          </div>
        </Stack>
      </Box>
     
    

      



    </>

  );
}
