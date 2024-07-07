// src/LoginPage.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Auth = ({ onLogin }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Please Log In
        </Typography>
        <Typography variant="body1" gutterBottom>
          You need to log in to see the details.
        </Typography>
        <Button variant="contained" color="primary" onClick={onLogin}>
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
