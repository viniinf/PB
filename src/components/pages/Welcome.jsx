//ds
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import { auth } from './firebase';


function Welcome() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center">
          Bem-vindo!
        </Typography>
      </Box>
    </Container>
  );
}

export default Welcome;