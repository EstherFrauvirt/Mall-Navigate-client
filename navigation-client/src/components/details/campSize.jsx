import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function CampSize() {
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can use height and width values as needed (e.g., send them to the server, perform calculations, etc.)
      console.log('Height:', height, 'Width:', width);
    };
  
  return (
    <div>
        <h3>enter hi</h3>
        <form onSubmit={handleSubmit}>
      <label>
        Height:
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <br />
      <label>
        Width:
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </label>
      <br />
     <Link to={`/buildMatrix?height=${height}&width=${width}`}> <button >Submit</button></Link>
    </form>
    </div>
  );
}
