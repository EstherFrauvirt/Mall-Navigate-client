import React, { useContext } from 'react'
import {Button, Link,Card, CardContent, Box, } from '@mui/material'
import EmailContext from '../context/emailContext'

export default function Path({ matrix }) {
    const {sendEmail}=useContext(EmailContext);
    return (
        <div style={{ minHeight: '90vh' }}>
            <Card sx={{ minHeight: '50%', minWidth: 275, width: "60%", marginLeft: '20%', marginTop: '2%', padding: '9px', marginBottom: '2%' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <CardContent>
                    <Link href="/create" underline="always">back to create</Link>

                    <Button variant="outlined" color="primary" onClick={sendEmail}
                   sx={{ marginBottom: '20px' ,borderColor:"#4a4cf5",color:"#4a4cf5"}}>
                   Email me with my itinerary
                  </Button>
                    </CardContent>
                </Box>
            </Card>

        </div>
    )
}
