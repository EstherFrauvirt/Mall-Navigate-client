import React from 'react'
import AppRoutes from './routers/appRouters'
import { Link } from 'react-router-dom'

export default function Admin() {
  return (
    <div>
        <Link to={"/campSize"}><button>create</button></Link>
    </div>
  )
}