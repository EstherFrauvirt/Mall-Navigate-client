import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';



export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();





  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <h5>LOGIN</h5>
      <Form>
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
      <br />
      <br />
      <Alert.Link href="/register">new user? register</Alert.Link>
      </Form>
    </>
  );
}