import React, { useContext } from 'react'
import ModalContext from '../context/modalContext'
import { Modal ,Box, Typography, Button} from '@mui/material';
import {  Paper,Grid} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import UserContext from '../context/userContext';

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
    const {open,handleClose,setRole}=useContext(ModalContext);
    const {user}=useContext(UserContext);
    console.log(user);
  return (
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>   
  <Box sx={style}>
    <Typography sx={{ textAlign: 'center',padding:'20px', color:'#4a4cf5' }}>
      Who Are You {user.name}?
    </Typography>
  
 <div style={{display:'flex',justifyContent:'space-evenly',padding:'50px'}}>
 <Button variant="outlined" 
 sx={{width:'250px',height:'250px'}}
 style={{
  color: '#4a4cf5', // Set text color
  borderColor: '#4a4cf5', // Set border color
}}
onClick={()=>{
  handleClose();
  setRole('user')}}
 ><div>
  <AccountCircleIcon sx={{fontSize:'40px'}}/>
  
  user
  <p style={{fontSize:'10px'}}>choose and create<br/> your ways in the mall</p></div>
  </Button>

    
  <Button variant="outlined" 
 sx={{width:'250px',height:'250px',marginLeft:'40px'}}
 style={{
  color: '#4a4cf5', // Set text color
  borderColor: '#4a4cf5', // Set border color
}}
onClick={()=>{
  handleClose();
  setRole('admin')}}
 >
  <div>
    <AdminPanelSettingsIcon sx={{fontSize:'50px'}}/>
 owner
 <p style={{fontSize:'10px'}}>join us<br/> in 4 simple steps</p>
  </div>
  

  </Button>

   </div>
   

    
  </Box>
</Modal>
  )
}
