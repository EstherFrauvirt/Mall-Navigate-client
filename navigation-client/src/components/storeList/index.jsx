import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const StoreList = ({ stores }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto',marginBottom:'20px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Stores to Visit
      </Typography>
      {stores.length === 0 ? (
        <Typography variant="body2" align="center">
          No stores to visit.
        </Typography>
      ) : (
        <List>
          {stores.map((store, index) => (
            <ListItem key={index}>
              <ListItemText primary={store} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default StoreList;