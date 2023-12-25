import { useState } from 'react'
import './App.css'
import Matrix from './components/matrix'
import BuildMatrix from './components/buildMatrix'
import { BrowserRouter, Link } from 'react-router-dom'
import AppRoutes from './components/routers/appRouters'
import Home from './components/home'

function App() {
  return (
    <>
    <BrowserRouter>
 {/* <Home></Home> */}
 <AppRoutes/>
 </BrowserRouter>
    </>
  )
}

export default App
