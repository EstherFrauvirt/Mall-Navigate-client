import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import config from './config';




export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [res, setRes] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (res) {
      navigate(`/admin?res=${res}`)
      localStorage.setItem("token", res.token)
    }
  }, [res])

  const fetchData = async () => {
    let result;
    try {

      const response = await fetch(`${config.BASE_URL}users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      result = await response.json();
      console.log(result);
      setRes(result);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    console.log(res);
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