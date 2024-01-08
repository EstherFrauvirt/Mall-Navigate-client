import React from 'react'
import "./created.css"
import { Button } from 'react-bootstrap'
import { Card, CardContent, Box, CardActions, Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
export default function Created() {
    return (
        <Card sx={{ minWidth: 275, width: "60%", marginLeft: '10%', minHeight: '90vh', marginTop: '2%', position: '', marginBottom: '2%', padding: '20px' }}>
            <Box display="flex" flexDirection="column" alignItems="center" width={'100%'}>
                <CardContent sx={{ width: '100%' }}>

                    <Container>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
                            <img
                                src="../../images/created.jpg" // Replace with your image URL
                                alt="Your Alt Text"
                                className="image"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <div>
                                <Typography sx={{ color: '#4a4cf5' }}>
                                    <h1 >Created!</h1>
                                    <h5>thank U for using navIt</h5>

                                </Typography>


                                <Link to="/">
                                    <Button variant="outlined" size='large' style={{
                                        color: "#ff8e88", border: 'solid 1px #ff8e88', marginTop: '20px',
                                        "&:hover": {
                                            backgroundColor: '#ff8e88',
                                            color: 'white',
                                            border: '#ff8e88'
                                        }
                                    }}>back to start</Button>
                                </Link>

                            </div>
                        </div>
                    </Container>
                </CardContent>
            </Box>
        </Card>

    )
}
