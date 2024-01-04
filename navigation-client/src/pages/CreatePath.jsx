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
// import { makeStyles } from '@mui/system';

// const useStyles = makeStyles({
//   noHover: {
//     '&:hover': {
//       backgroundColor: 'inherit', // or any other styles you want to override
//     },
//   },
// });

export default function CreatePath() {
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


  useEffect(() => {
    myfetchData('mall');
  }, [])


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

              <AutocompleteSelect options={malls} zise='' title='mall' action={chooseMall} resetValue={false} />

              {placeFlag && <div id="showAfterClick">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                  <AutocompleteSelect options={stores} size='250px' title='start point' action={chooseStartPointClick} resetValue={false} />
                  <AutocompleteSelect options={stores} size='250px' title='place' action={addPlaceToVisit} resetValue={true} />

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
                <MatrixForShow matrix={mat} heightmat={mat[0].length} widthmat={mat.length} path={pathCoordinates} />
              )}
            </CardContent></Box> </Card>
      </div>

    </>
  )
}