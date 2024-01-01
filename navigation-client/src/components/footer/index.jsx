import { Box, styled } from '@mui/material'
import React from 'react'
const FooterBox=styled('div')({
  width:'100%',
  backgroundColor:'#91b3fa',
  height:'80px',
  color:'white',

})
export default function Footer() {
  return (
    <FooterBox>
    <div>Footer</div>
    </FooterBox>

  )
}
