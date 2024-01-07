import {
    Button, IconButton, Tooltip
} from '@mui/material'
import React, { useContext, useEffect } from 'react'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import EmailContext from '../context/emailContext';
import UserContext from '../context/userContext';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

export default function SendEmailButton() {
    const { user } = useContext(UserContext);
    const { sendEmail, setSubject, setEmail, setMassage, subject } = useContext(EmailContext);
    const handleClick = () => {
        if (user) {
            sendEmail();
        }
    }


    return (
        <>
            <Tooltip title="email me the path" arrow>
              
                <Button 
                sx={{marginBottom:'10px',
                color:'#4a4cf5',
                borderColor:'#4a4cf5'
            }}
                 onClick={handleClick} variant="outlined" startIcon={<EmailRoundedIcon />}>
                    Send
                </Button>
            </Tooltip>



        </>
    )
}
