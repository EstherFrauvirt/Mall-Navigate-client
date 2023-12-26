import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    
  };

  return (
    <>
      <h5>LOGIN</h5>
      
    </>
  );
}