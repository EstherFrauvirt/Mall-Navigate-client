import React, { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import RouteIcon from '@mui/icons-material/Route';
import { AppBar, Typography, Toolbar, Box, Button } from '@mui/material'
import ModalContext from '../context/modalContext';
import { Link, useNavigate } from 'react-router-dom';
import LoginContext from '../context/loginContext';

const StyledToolbar = styled('Toolbar')({
  display: "flex",
  justifyContent: "space-between",

})
export default function NavBar() {

  const navigate = useNavigate();
  const { handleOpen } = useContext(ModalContext);
  const { setIsLogin, isLogin, logout } = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogin(true)
    else setIsLogin(false)
  }, [isLogin])

  const loginHandle = () => {
    navigate('/login')
  }
  const registerHandle = () => {
    navigate('/register')
  }

  const logoutHandle = () => {
    logout()
    navigate('/')
  }

  return (
    <>

      <AppBar position='sticky' sx={{ backgroundColor: '#4a4cf5', height: '10vh' }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <RouteIcon sx={{ fontSize: '42px', color: 'white',  marginRight: '7px', display: { xs: "block", sm: "block" } }}></RouteIcon>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant='h5' sx={{ color: 'white', display: { xs: "none", sm: "block" } }}>NAV<span style={{color: 'white', fontFamily: 'Mansalva, sans-serif' }}>it</span></Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {!isLogin && <>
              <Button
                onClick={registerHandle}
                variant="outlined"
                sx={{
                  my: 2, color: 'white', marginLeft: "40px", display: 'block', "&:hover": {
                    backgroundColor: 'white',
                    color: '#ff8e88'
                  }
                }}
              >
                {"register"}
              </Button>
              <Button
                onClick={loginHandle}
                variant="outlined"
                sx={{
                  my: 2, color: 'white', marginLeft: "40px", display: 'block', "&:hover": {
                    backgroundColor: 'white',
                    color: '#ff8e88',

                  }
                }}
              >
                {"login"}
              </Button></>}
            {isLogin && <>
             <Link to="/privateArea" style={{ textDecoration: 'none' }}> <Button
              variant="outlined"
              sx={{
                my: 2, color: 'white', marginLeft: "40px", display: 'block', "&:hover": {
                  backgroundColor: 'white',
                  color: '#ff8e88',

                }
              }}
            >Private area</Button></Link>
              <Button
              onClick={logoutHandle}
              variant="outlined"
              sx={{
                my: 2, color: 'white', marginLeft: "40px", display: 'block', "&:hover": {
                  backgroundColor: 'white',
                  color: '#ff8e88',

                }
              }}
            >
              {"logout"}
            </Button></>}

          </Box>

        </Toolbar>
      </AppBar>
    </>
  )
}
