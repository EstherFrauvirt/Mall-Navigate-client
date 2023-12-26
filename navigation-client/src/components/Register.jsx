import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";


export default function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    });
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();
        
        navigate("/");
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