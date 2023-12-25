import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Matrix from './components/matrix'
import BuildMatrix from './components/buildMatrix'

function App() {
  return (
    <>
   <BuildMatrix width={5} height={5}/>
    </>
  )
}

export default App
