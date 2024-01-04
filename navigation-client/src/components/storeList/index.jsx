import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const StoreList = ({ stores, onDelete }) => {
  return (
    <Paper elevation={1} style={{ padding: '20px', maxWidth: '430px', margin: 'auto', marginBottom: '20px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Points you chose:
      </Typography>
      {stores.length === 0 ? (
        <Typography variant="body2" align="center">
          No points to visit.
        </Typography>
      ) : (
        <List sx={{width:'400px', display:'flex',flexWrap:'wrap'}}>
          {stores.map((store, index) => (
            <ListItem key={index}
            sx={{minWidth:'50px',maxWidth:'120px',border:'solid #4a4cf5 1px', borderRadius:'35px',background:'#f5f8ff',color:'#616675',marginLeft:'5px',marginBottom:'5px'}}
            >
              <ListItemText  primary={store.name} />
              <IconButton sx={{color:'#4a4cf5'}} onClick={() => onDelete(index)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton> 
            </ListItem>
          
          
          ))}
        </List>
      )}
    </Paper>
  );
};

export default StoreList;
