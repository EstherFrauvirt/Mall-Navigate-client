import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import BuildMatrix from '../buildMatrix'
import App from '../../App'
import Admin from '../admin/admin'
import CampSize from '../details/campSize'
import CreatePath from '../../pages/CreatePath'

import Home from '../../pages/Home'
import Register from '../Register'
import Login from '../Login'
import Footer from '../footer'

import Navbar from '../navBar';
import GlobalModal from '../modal'
import Erase from '../details/erase'
import { getUserLocation } from '../utils/map'
import { findClosestCoordinate } from '../utils/map'
import Path from '../path'
// import EmailComponent from '../../components/email'
import Maps from '../../components/Maps'
import ScreenShot from '../../components/ScreenShot'

import Place from '../admin/Place'
import ContactUs from '../../pages/ContactUs'
import Created from '../../pages/created'
import PrivateArea from '../../pages/privateArea'
import NotFound404 from '../../pages/notFound404'



const mallCoords = [

    [31.0981, 34.8783],
    [31.7380, 34.6943],
    [30.7380, 35.6943]


];
// const Container = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
//   });

const startCoord = await getUserLocation();
const endCoord = await findClosestCoordinate(startCoord, mallCoords);
console.log(endCoord);


export default function AppRoutes() {
    return (
        <div>

            <Navbar></Navbar>

            <Routes>
                <Route path='/admin' element={<Admin />}>
                    <Route path='buildMatrix' element={<BuildMatrix />} />
                    <Route path='campSize' element={<CampSize />} />
                </Route>

                <Route path='/erase' element={<Erase />} />
                <Route path='/create' element={<CreatePath />} />
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='/email' element={<EmailComponent />} /> */}
                <Route path='/maps' element={<Maps startCoords={startCoord} endCoords={endCoord} />} />
                <Route path='/place' element={<Place />} />
                <Route path='/screenShot' element={<ScreenShot />} />
                <Route path='/path' element={<Path />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/created' element={<Created />} />

                <Route path='/privateArea' element={<PrivateArea />} />
                <Route path='/*' element={<NotFound404 />} />

                {/* <Route path='/cvList' element={<CvList />} /> */}
                {/* <Route path='/cvList/:id' element={<Resume />} /> */}
            </Routes>
            <GlobalModal></GlobalModal>
            <Footer></Footer>

        </div>
    )
}
