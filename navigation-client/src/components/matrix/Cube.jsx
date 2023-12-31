import { Button, Paper } from '@mui/material'
import React, { useState } from 'react'
import DoorSlidingTwoToneIcon from '@mui/icons-material/DoorSlidingTwoTone';
import { height } from '@mui/system';

export default function Cube({ title, color, width, height, border, path, icon = false }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const cubeStyle = {
    background: hovered ? 'rgb(252 202 200)' : color, // Change the color on hover
    border: '1px solid black',
    width: `${600 * width / 100}px`,
    height: `${600 * height / 100}px`,
    zIndex: '999'
  };
  const content = (title) => {
    switch (title) {
      case "door":
        return <DoorSlidingTwoToneIcon />
      case "entrance":
        return <DoorSlidingTwoToneIcon />
      case "path":
        return " "
      default: {
        if (title.length <= 1) {
          return title
        } else {
          return " "
        }
      }
    }
  }
  return (
    <div
      style={{
        background: hovered ? 'red' : color,
        border: border,
        width: `${600 * width / 100}px`,
        height: `${600 * height / 100}px`,
        textAlign:"center",
        display:"flex",
        justifyContent:"center",alignItems:"center"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{
      }}>
        {content(title)}
        {/* {(title === "door" || title === "entrance") ? <DoorSlidingTwoToneIcon /> : title} */}
      </div>
      <div>
        {icon && icon}
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
