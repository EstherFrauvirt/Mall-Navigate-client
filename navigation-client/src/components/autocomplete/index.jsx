import React, { useState,useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutocompleteSelect = ({ options ,size,title,action,resetValue,closestValue}) => {

    
  const [value, setValue] = useState(closestValue);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)

        action(newValue)
        if(resetValue)
        setValue(null)
    }}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={`Select a ${title}`} variant="outlined"  
        sx={{ width:size ,marginBottom:'20px'}} />
      )}
    />
  );
};

export default AutocompleteSelect;
