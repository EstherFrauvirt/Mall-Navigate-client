import React, { useContext } from 'react'
import ModalContext from '../context/modalContext'
import { Modal ,Box, Typography, Button} from '@mui/material';
import {  Paper,Grid} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth:'1000px',
    bgcolor: 'background.paper',
    border: '1px solid #4a4cf5',
    boxShadow: 24,
    p: 4,
  }; 
export default function GlobalModal({}) {
    const {open,handleClose}=useContext(ModalContext);
  return (
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>   
  <Box sx={style}>
    <Typography sx={{ textAlign: 'center',padding:'20px', color:'#4a4cf5' }}>
      Who Are You?
    </Typography>
  
 <div style={{display:'flex',justifyContent:'space-evenly',padding:'50px'}}>
 <Button variant="outlined" 
 sx={{width:'250px',height:'250px'}}
 style={{
  color: '#4a4cf5', // Set text color
  borderColor: '#4a4cf5', // Set border color
}}
 >
  <AccountCircleIcon sx={{fontSize:'40px'}}/>
  user
  </Button>

    
  <Button variant="outlined" 
 sx={{width:'250px',height:'250px',marginLeft:'40px'}}
 style={{
  color: '#4a4cf5', // Set text color
  borderColor: '#4a4cf5', // Set border color
}}
 >
  <AdminPanelSettingsIcon sx={{fontSize:'40px'}}/>
 owner
  </Button>

   </div>
   

    
  </Box>
</Modal>
  )
}
