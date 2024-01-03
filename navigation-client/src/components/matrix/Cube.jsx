import { Button, Paper } from '@mui/material'
import React, { useState } from 'react'
import DoorSlidingTwoToneIcon from '@mui/icons-material/DoorSlidingTwoTone';
import { height } from '@mui/system';

export default function Cube({ title, color,width,height,index,isClicked ,border}) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };


  return (
    <div
      style={{ background: hovered ? 'red' : color, 
      border: border,
      width: `${600 * width / 100}px`,
      height: `${600 * height / 100}px`,}}
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
