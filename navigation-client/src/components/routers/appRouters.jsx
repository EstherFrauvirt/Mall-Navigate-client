import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import BuildMatrix from '../buildMatrix'
import App from '../../App'
import Home from '../home'
import CampSize from '../details/campSize'

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/buildMatrix' element={<BuildMatrix />} />
                 <Route path='/campSize' element={<CampSize  />} />
               {/* <Route path='/cvList' element={<CvList />} /> */}
                {/* <Route path='/cvList/:id' element={<Resume />} /> */}
            </Routes>
        </div>
    )
}
