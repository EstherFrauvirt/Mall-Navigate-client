import React, { useState, useEffect } from 'react'
import AutocompleteSelect from '../components/autocomplete';
import { Button } from '@mui/material';
import StoreList from '../components/storeList';
import config from '../config';
import { fetchData } from '../components/utils/servises';
import { Container } from '@mui/system';
import './CreatePath.css'
import ShowPath from './ShowPath';

export default function CreatePath() {
  const [currentPlace, setCurrentPlace] = useState([]);
  const [currentMall, setCurrentMall] = useState();
  const [startPoint, setStartPoint] = useState();
  const [placesToVisit, setPlacesToVisit] = useState([])
  const [malls, setMalls] = useState([]);
  const [stores, setStores] = useState([]);
  const [placeFlag, setPlaceFlag] = useState(false)
  const [showColorMatrix, setShowColorMatrix] = useState(false);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const matrix = [
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
];

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
      .then((data => { console.log(data); setPathCoordinates(data.path); createMat(data.mat); setShowColorMatrix(true) }))
      .catch((err) => console.log(err))
  }

  const addPlaceToVisit = (place) => {
    setCurrentPlace(place)
  }


  const chooseStartPointClick = (place) => {
    setStartPoint(place)
  }
  const createMat = (mat) => {
    // setStartPoint(place)
  }

  const chooseMall = (value) => {
    setCurrentMall(value)
    myfetchData(`store/${value.id}`);
    setPlaceFlag(true);

  }
  return (
    <>
      <div style={{ height: "90vh" }}>
        <div class="all">
          <Container></Container>
            <h2 class="h2">Lets start shopping!<br /> </h2>

            <br />
            <div className="d-flex justify-content-center align-item-center">
              <div>
                <AutocompleteSelect options={malls} zise='' title='mall' action={chooseMall} resetValue={false} />
                {placeFlag && <AutocompleteSelect options={stores} size='200px' title='start point' action={chooseStartPointClick} resetValue={false} />}
                {placeFlag && <AutocompleteSelect options={stores} size='200px' title='place' action={addPlaceToVisit} resetValue={true} />}
                <Button variant="contained" color="primary" onClick={handleClick} sx={{ marginBottom: '20px' }}>
                  Add place
        </Button>
              </div>
            </div>

        <Button variant="contained" color="primary" onClick={handleClick} sx={{ marginBottom: '20px' }}>
          Add place
        </Button>

        <StoreList stores={placesToVisit} />
        <Button onClick={handleCreatePathClick} variant="contained" color="primary" sx={{ marginBottom: '20px' }}>
          Create a path
        </Button>

        {showColorMatrix && (
          <ShowPath matrix={matrix} coordinates={pathCoordinates}/>)}
      </div>
      </div>
    </>
  )
}