import { Button, Paper } from '@mui/material'
import React, { useState } from 'react'
import DoorSlidingTwoToneIcon from '@mui/icons-material/DoorSlidingTwoTone';
import { height } from '@mui/system';

export default function Cube({ title, color,width,height,index }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const cubeStyle = {
    background: hovered ? 'red' : color, // Change the color on hover
    border: '1px solid black',
    width: `${600 * width / 100}px`,
    height: `${600 * height / 100}px`,
  };

  return (
    <div
      style={cubeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {(title === "door" || title === "enter") ? <DoorSlidingTwoToneIcon /> : title}
      </div>
    </div>
  );
  // return (
  // <div style={{background:`${color}`,border:"1px solid black" ,width:`${600*width/100}px`,height:`${600*height/100}px`}}>
  //   <div >
  //     {(title === "door" || title === "enter") ? "%" : " "}
  //     </div></div> 
  // )
}
