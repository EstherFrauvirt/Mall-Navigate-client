import React, { useContext, useRef } from 'react'
import { Button, Link, Card, CardContent, Box, } from '@mui/material'
import EmailContext from '../context/emailContext'
import html2canvas from 'html2canvas';


export default function Path({ matrix }) {
    const { sendEmail } = useContext(EmailContext);
    const capturedImageRef = useRef(null);

  const handleScreenshot = () => {
    const elementToCapture = document.getElementById('elementToCapture');

    if (elementToCapture) {
      html2canvas(elementToCapture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        if (capturedImageRef.current) {
          capturedImageRef.current.src = imgData;
        } else {
          console.error('Image element not found');
        }
      });
    } else {
      console.error('Element not found');
    }
  };



    return (
        <div>
            <button onClick={handleScreenshot}>Take Screenshot</button>
            <div id="elementToCapture">
                {/* Your content to capture goes here */}
                <div style={{ minHeight: '90vh' }}>
                    <Card sx={{ minHeight: '50%', minWidth: 275, width: "60%", marginLeft: '20%', marginTop: '2%', padding: '9px', marginBottom: '2%' }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <CardContent>
                                <Link href="/create" underline="always">back to create</Link>

                                <Button variant="outlined" color="primary" onClick={sendEmail}
                                    sx={{ marginBottom: '20px', borderColor: "#4a4cf5", color: "#4a4cf5" }}>
                                    Email me with my itinerary
                  </Button>
                            </CardContent>
                        </Box>
                    </Card>

                </div>
            </div>
        </div>

    )
}
