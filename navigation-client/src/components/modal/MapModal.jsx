import React, { useContext, useEffect, useState } from 'react'
import ModalContext from '../context/modalContext'
import { Modal, Box, Typography, Button } from '@mui/material';
import { Paper, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import UserContext from '../context/userContext';
import MapWithRoute from '../Maps';
import { getUserLocation } from '../utils/map'
import { findClosestCoordinate } from '../utils/map'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '60%',
    bgcolor: 'background.paper',
    border: '1px solid #4a4cf5',
    boxShadow: 24,
    p: 4,
};
export default function MapModal({startCoord,endCoord }) {
    const [mallsCoords, setMallsCoords] = useState([
        [31.0981, 34.8783],
        [31.7380, 34.6943],
        [30.7380, 35.6943]
    ]);


    const { open1, handleClose1, setRole1 } = useContext(ModalContext);
    const { user } = useContext(UserContext);
    // const [startCoord,setStartCoord]=useState();
    // const [endCoord,setEndCoord]=useState();


    const startMap = async () => {
        // const startcoord = await getUserLocation();
        // setStartCoord(startcoord)
        // console.log(startCoord);
        // const endcoord = findClosestCoordinate(startCoord, mallsCoords);
        // setEndCoord(endcoord)
        // console.log(endCoord);
    }

    useEffect(()=>{
        //startMap();
    },[])

    return (
        <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{ textAlign: 'center', padding: '20px', color: '#4a4cf5' }}>
                    Your Way To The Mall
                </Typography>
                <div style={{width:'' ,display:'flex',justifyContent:'space-evenly'}}>
                      <MapWithRoute startCoords={startCoord} endCoords={endCoord}></MapWithRoute>
                </div>

            </Box>
        </Modal>
    )
}

