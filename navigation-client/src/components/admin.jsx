import React from 'react'
import AppRoutes from './routers/appRouters'
import { Link } from 'react-router-dom'
import config from '../config';

export default function Admin() {
  const fetchData = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}mall`,
        {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={fetchData}>click me</button>
        <Link to={"/campSize"}><button>create</button></Link>
    </div>
  )
}
