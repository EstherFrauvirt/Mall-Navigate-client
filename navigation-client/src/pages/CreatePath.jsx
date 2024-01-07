import React, { useState, useEffect, useContext } from 'react'
import AutocompleteSelect from '../components/autocomplete';
import { Button, Card, Box, CardContent, Typography, Grid } from '@mui/material';
import StoreList from '../components/storeList';
import config from '../config';
import { fetchData } from '../components/utils/servises';
import UserContext from '../components/context/userContext';
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './CreatePath.css'
import ShowPath from './ShowPath';
import MatrixForShow from '../components/matrix/matrixForShow';
import ModalContext from '../components/context/modalContext';
import MapModal from '../components/modal/MapModal';
import { getUserLocation } from '../components/utils/map'
import { findClosestCoordinate } from '../components/utils/map'
import SendEmailButton from '../components/user/sendEmailButton';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';

// import { makeStyles } from '@mui/system';

// const useStyles = makeStyles({
//   noHover: {
//     '&:hover': {
//       backgroundColor: 'inherit', // or any other styles you want to override
//     },
//   },
// });

export default function CreatePath() {
  const { handleOpen1 } = useContext(ModalContext)
  const navigate = useNavigate();
  const [currentPlace, setCurrentPlace] = useState([]);
  const [currentMall, setCurrentMall] = useState();
  const [startPoint, setStartPoint] = useState();
  const [placesToVisit, setPlacesToVisit] = useState([])
  const [malls, setMalls] = useState([]);
  const [stores, setStores] = useState([]);
  const [placeFlag, setPlaceFlag] = useState(false)
  const { user } = useContext(UserContext);
  const [showColorMatrix, setShowColorMatrix] = useState(false);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [mat, setMat] = useState([[]]);
  const [storePathArr, setStorePathArr] = useState([]);
  const [nearestMall, setNearestMall] = useState(null);
  const [startCoord, setStartCoord] = useState();
  const [endCoord, setEndCoord] = useState();



  useEffect(() => {
    myfetchData('mall');

  }, [])
  useEffect(() => {
    console.log(malls);

  }, [malls])


  const myfetchData = async (type) => {
    try {
      const response = await fetch(`${config.BASE_URL}${type}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (type === 'mall') {
        setMalls(result);
      } else if (type.startsWith('store')) {

        setStores(result);
      }

    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    setPlacesToVisit([...placesToVisit, currentPlace])

  }
  const handleTakeMeToTheMallClick = () => {
    handleOpen1();

  }


  const handleCreatePathClick = () => {
    const obj = {
      mall: currentMall,
      stores: placesToVisit,
      startPoint: startPoint
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ``
        //  Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(obj)
    }
    console.log(obj);
    fetchData(`path`, options)
      .then((data => { console.log(data); setPathCoordinates(data.path); setMat(data.mat); setStorePathArr(data.storePathArr); setShowColorMatrix(true) }))
      .catch((err) => console.log(err))
    // navigate('/path')
  }

  const addPlaceToVisit = (place) => {
    setCurrentPlace(place)
  }
  const handleChooseTheClosetClick = async () => {

    const mallCoords = malls.filter(item => item.coords && item.coords.length !== 0).map(item => item.coords);


    console.log(mallCoords);
    const startCoord = await getUserLocation();
    setStartCoord(startCoord);
    const endCoord = findClosestCoordinate(startCoord, mallCoords);
    setEndCoord(endCoord);
    console.log(endCoord);
    const closestMall = malls.filter(item => {
      if (item.coords)
        if (item.coords[0] == endCoord[0] && item.coords[1] == endCoord[1])
          return item
    });
    setNearestMall({ ...closestMall })
    setCurrentMall({ ...closestMall })
    setPlaceFlag(true);

    console.log(closestMall[0]);
    handleOpen1();




  }
  const handleDelete = (index) => {
    const updatedPlacesToVisit = [...placesToVisit];
    updatedPlacesToVisit.splice(index, 1);
    setPlacesToVisit(updatedPlacesToVisit);
  };
  const chooseStartPointClick = (place) => {
    setStartPoint(place)
    const arr = [...placesToVisit];
    arr[0] = place;
    setPlacesToVisit(arr);
  }

  const chooseMall = (value) => {
    setCurrentMall(value)
    myfetchData(`store/${value.id}`);
    setPlaceFlag(true);

  }
  // const classes = useStyles();
  return (

    <>
      <div style={{ minHeight: '90vh' }}>
        <Card sx={{ minHeight: '50%', minWidth: 275, width: "60%", marginLeft: '20%', marginTop: '2%', padding: '9px', marginBottom: '2%' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardContent>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography align='center' variant='h5'
                  sx={{ color: '#4a4cf5', borderRadius: '25px', padding: '15px', minWidth: '400px', height: '100px' }}
                >Hi {user.name}:)<br /> Here you can plan your way.
                </Typography>
                <img style={{ width: '250px' }} src={`../../images/path-user.jpg`} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <AutocompleteSelect options={malls} size='400px' title='mall' action={chooseMall} resetValue={false} closestValue={nearestMall} />
                {/* <Button variant="outlined" color="primary" onClick={handleTakeMeToTheMallClick}
                    sx={{ marginBottom: '20px', borderColor: "#4a4cf5", color: "#4a4cf5" }}>
                    Take me to the mall
                  </Button> */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    padding: '11px',
                    color: '#4a4cf5'
                  }}
                >or</Typography>
                <Button variant="outlined" color="primary" onClick={handleChooseTheClosetClick}
                  sx={{ marginBottom: '20px', borderColor: "#4a4cf5", color: "#4a4cf5" }}>
                  get the nearest mall
                </Button></div>

              {placeFlag && <div id="showAfterClick">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                  <AutocompleteSelect options={stores} size='250px' title='start point' action={chooseStartPointClick} resetValue={false} closestValue={null} />
                  <AutocompleteSelect options={stores} size='250px' title='place' action={addPlaceToVisit} resetValue={true} losestValue={null} />

                  <Button variant="outlined" color="primary" onClick={handleClick}
                    sx={{ marginBottom: '20px', borderColor: "#4a4cf5", color: "#4a4cf5" }}>
                    Add place
                  </Button></div>
                <StoreList stores={placesToVisit} onDelete={handleDelete} />
                <Grid container justifyContent="center">
                  <Grid item>
                    <Button size='large' onClick={handleCreatePathClick} variant="outlined" color="primary" sx={{ marginBottom: '20px', borderColor: "#4a4cf5", color: "#4a4cf5", height: '60px' }}>
                      Create a path
                    </Button>
                  </Grid>
                </Grid></div>
              }
              <div style={{ display: 'flex' }}>
                {storePathArr.map((store, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      sx={{ color: '#4a4cf5' }}
                      // disableRipple = {true}
                      // disableTouchRipple = {true}
                      endIcon={index !== storePathArr.length - 1 ? <ArrowForwardIcon /> : ''}
                    // className={classes.noHover}
                    >
                      <h5>{store.name}</h5>
                    </Button>
                  </div>
                ))}
              </div>

              {showColorMatrix && (
                <>
                  {/* <Box display="flex" justifyContent="space-between" alignItems="center"> */}

                  <SendEmailButton />
                  <MatrixForShow matrix={mat} heightmat={mat[0].length} widthmat={mat.length} path={pathCoordinates} />
                  {/* </Box> */}
                </>
              )}
            </CardContent></Box> </Card>
      </div>
      <MapModal endCoord={endCoord} startCoord={startCoord} />
    </>
  )
}