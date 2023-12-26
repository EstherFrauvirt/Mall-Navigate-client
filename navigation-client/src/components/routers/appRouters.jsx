import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import BuildMatrix from '../buildMatrix'
import App from '../../App'
import Admin from '../admin'
import CampSize from '../details/campSize'
import Home from '../../pages/Home'

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/buildMatrix' element={<BuildMatrix />} />
                 <Route path='/campSize' element={<CampSize  />} />
                 <Route path='/' element={<Home />}/>

               {/* <Route path='/cvList' element={<CvList />} /> */}
                {/* <Route path='/cvList/:id' element={<Resume />} /> */}
            </Routes>
        </div>
    )
}
