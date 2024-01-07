import React from 'react'
import "./created.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Created() {
    return (
        <div className="image-container">
            <img
                src="../../images/created.jpg" // Replace with your image URL
                alt="Your Alt Text"
                className="image"
            />
            <div>
            <div className="text-overlay">
                <div className='text-overlay-div'>
                <h1 >Created!</h1>
                <h5>thank U for using navIt</h5>
                </div>
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
          
        </div>

    )
}
