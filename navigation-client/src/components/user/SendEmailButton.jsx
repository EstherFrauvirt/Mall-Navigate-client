import {
    Button, IconButton, Tooltip
} from '@mui/material'
import React, { useContext,useEffect } from 'react'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import EmailContext from '../context/emailContext';
import UserContext from '../context/userContext';

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
                <IconButton
                    onClick={handleClick}
                    sx={{
                        // marginTop:'10px',
                        marginBottom:'10px',
                        color: '#4a4cf5',
                        border: '1px solid #4a4cf5'
                    }}
                    aria-label="sent email">
                    <AlternateEmailRoundedIcon />
                </IconButton>
            </Tooltip>



        </>
    )
}
