import React, { useContext, useState } from 'react'
import AppRoutes from './routers/appRouters'
import { Link } from 'react-router-dom'
import config from '../config';
import { useNavigate,useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import mallContext from './context/mallContext'

export default function Admin() {
  const location = useLocation();
  const navigate=useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const {mall,setMall}=useContext(mallContext)
  let user = searchParams.get('res');
  console.log("admin", user);


  const handleClick=()=>{
    fetchData();

  }
  const fetchData = async () => {
    console.log(mall);
    try {
      const response = await fetch(`${config.BASE_URL}mall`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(mall),
        });

      if (!response.ok) {
        console.log(response);
        throw new Error('Make sure name is unique');
      }
      const result = await response.json();
      console.log(result);
      setMall(result)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Mall Name</Form.Label>
          <Form.Control type="text" placeholder="Mall name" onChange={(e) => { setMall({...mall, name: e.target.value}) }} />
        </Form.Group>
        <Link to={"/campSize"}><button onClick={handleClick}>create</button></Link>
      </Form>
    </div>
  )
}
