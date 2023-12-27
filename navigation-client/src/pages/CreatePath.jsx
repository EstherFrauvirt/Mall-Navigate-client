import React, { useState, useEffect } from 'react'
import AutocompleteSelect from '../components/autocomplete';
import { Button } from '@mui/material';
import StoreList from '../components/storeList';
import config from '../config';

export default function CreatePath() {
  const [currentPlace, setCurrentPlace] = useState([]);
  const [placesToVisit, setPlacesToVisit] = useState([])
  const [malls, setMalls] = useState([]);
  const [stores, setStores] = useState([]);
  const [placeFlag, setPlaceFlag] = useState(false)

  useEffect(() => {
    fetchData('mall');
  }, [])


  const fetchData = async (type) => {
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

  const addPlaceToVisit = (place) => {
    setCurrentPlace(place.name)
  }

  const chooseMall = (value) => {
    
    fetchData(`store/${value.id}`);
    setPlaceFlag(true);

  }
  return (
    <>

      <div>
        <h2>Hei, We are happy to see you,<br /> here you can plan your way in the mall 😊🤑</h2>
        <AutocompleteSelect options={malls} zise='' title='mall' action={chooseMall} resetValue={false} />
        {placeFlag && <AutocompleteSelect options={stores} size='200px' title='place' action={addPlaceToVisit} resetValue={true} />}

        <Button variant="contained" color="primary" onClick={handleClick} sx={{ marginBottom: '20px' }}>
          Add place
        </Button>

        <StoreList stores={placesToVisit} />
        <Button variant="contained" color="primary"  sx={{ marginBottom: '20px' }}>
          Create a path
        </Button>

      </div>
    </>
  )
}
