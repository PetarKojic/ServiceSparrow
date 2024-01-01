import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loadercom() {
  return (
    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' ,alignSelf:'center',marginLeft:'5%',marginTop:'-3%'}}>
      <CircularProgress size="30px"/>
    </Box>
  );
}