import React from 'react'

export default function Cube({title}) {
  return (
    <span style={{border:'solid', borderWidth:'2px',borderColor:'black',width:20,height:20,}}>{title|| "  "}</span>
  )
}
