import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import config from './config';


export default function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    });
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
          const response = await fetch(`${config.BASE_URL}users/register`,
          {
            method: 'POST', // specify the HTTP method
            headers: {
              'Content-Type': 'application/json', // specify the content type if sending JSON data
              // Add any additional headers as needed
            },
            body: JSON.stringify(user),
          });
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
          console.log(result);
        } catch (error) {
          lcosole.log(error);
        } 
      };


    const handleSubmit = (e) => {
        e.preventDefault();
         fetchData();

        navigate("/login");
    };

    return (
        <div>
            <h5>REGISTER</h5>

            <Form>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                </Form.Group>


                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form></div>
    )
}