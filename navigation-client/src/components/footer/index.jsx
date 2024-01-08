import { Box, Button, styled ,Link,Container} from '@mui/material'
import { display } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';

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
      <Container>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:'100%'}}>


    <div   style={{
      height:'100%',
      display:'flex',
      justifyContent:'space-around',
      alignItems:'center',
      width:'50%'
  
      }}>
<FacebookIcon sx={{color:'white'}}/>
<LinkedInIcon sx={{color:'white'}}/>
<WhatsAppIcon sx={{color:'white'}}/>
<YouTubeIcon sx={{color:'white'}}/>
    </div>
    <div style={{display:'',direction:'',}} >

    <Link href="#"  underline="hover" onClick={contactHandle} sx={{color:"white", }}>
  Contact Us
</Link><br/>
<Link href="#"  underline="hover" sx={{color:"white"}}>
  Term Use
</Link>
    </div>
    </div></Container>
    </FooterBox>

  )
}
