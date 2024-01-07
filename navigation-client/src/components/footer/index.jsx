import { Box, Button, styled } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const FooterBox=styled('div')({
  width:'100%',
  backgroundColor:'#91b3fa',
  height:'80px',
  color:'white',
  marginTop: 'auto'

})
export default function Footer() {

  const navigate= useNavigate()

  const contactHandle = () => {
    navigate("/contact")
  }

  return (
    <FooterBox>
    <div>
    <Button
                onClick={contactHandle}
                variant="outlined"
                sx={{
                  my: 2, color: 'white', marginLeft: "40px", display: 'block', "&:hover": {
                    backgroundColor: 'white',
                    color: '#ff8e88',

                  }
                }}
              >
                {"Contact Us"}
              </Button>
    </div>
    </FooterBox>

  )
}
