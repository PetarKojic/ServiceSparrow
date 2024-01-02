import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const BackdropLoader = ({ open }) => {
  return (
    <Backdrop open={open} style={{ zIndex: 9999 }} >
      <CircularProgress color="inherit"  />
    </Backdrop> 
  );
};

export default BackdropLoader;
