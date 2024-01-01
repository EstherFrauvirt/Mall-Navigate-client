import React, { useState } from 'react'

export default function Try() {
    const [number, setNumber] = useState(0)
    const [moduleNum, setModuleNum] = useState(0)
    const handleChange = (e)=>{
setNumber(e.target.value)
setModuleNum(e.target.value/12)
    }
  return (
    <div>Try
        <input type='nember' onChange={handleChange}>

        </input>
        {moduleNum}
    </div>
  )
}
