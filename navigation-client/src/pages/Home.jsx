import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

export default function Home() {
  return (
    <div><h1>Welcome to resume builder</h1>
    <br />
    <br />       
        <Login/>
        <Register/>   
    </div>
  )
}