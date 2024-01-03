// import { } from '@mui/base';
import { InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import React, { useContext } from 'react'
import MallContext from '../context/mallContext';
import Matrix from '../matrix';
import MatrixForShow from '../matrix/matrixForShow';

export default function Erase({mat}) {
    const {storeArr, mallEnterArr,  } = useContext(MallContext);

  return (
   <>
   what do you want to erase?
   <br/>
   <FormControl style={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label" >chose kind of area</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="type"
                // value={formData.type}
                label="Age"
                // onChange={handleChange}
            >
                <MenuItem value={"store"}>store</MenuItem>
                <MenuItem value={"path"}>path</MenuItem>
                <MenuItem value={"entrance"}>entrance</MenuItem>
            </Select>
        </FormControl>
        <MatrixForShow matrix={mat}/>
   </>
  )
}
