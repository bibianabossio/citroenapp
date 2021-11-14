import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./Loading.css"


export default function Loading() {
    
  return (
    <Box className="progreso" sx={{ display: 'flex',alignItems: "center",
    justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}