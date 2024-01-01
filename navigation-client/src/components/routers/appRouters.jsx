import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import BuildMatrix from '../buildMatrix'
import App from '../../App'
import Admin from '../admin'
import CampSize from '../details/campSize'
import CreatePath from '../../pages/CreatePath'

import Home from '../../pages/Home'
import Register from '../Register'
import Login from '../Login'
import Footer from '../footer'

import Navbar from '../navBar';
import GlobalModal from '../modal'

export default function AppRoutes() {
    return (
        <div>
        <Navbar></Navbar>

            <Routes>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/try' element={<Try />} />
                <Route path='/buildMatrix' element={<BuildMatrix />} />
                 <Route path='/campSize' element={<CampSize  />} />
                 <Route path='/create' element={<CreatePath/>} />
                 <Route path='/' element={<Home />}/>
                 <Route path='/register' element={<Register />}/>
                 <Route path='/login' element={<Login />}/>


               {/* <Route path='/cvList' element={<CvList />} /> */}
                {/* <Route path='/cvList/:id' element={<Resume />} /> */}
            </Routes>
            <GlobalModal></GlobalModal>
            <Footer></Footer>
        </div>
    )
}
