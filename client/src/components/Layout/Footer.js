// src/components/Layout/Footer.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 2,
        mt: 'auto',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
      component="footer"
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Loyalty Points Exchange System
      </Typography>
    </Box>
  );
};

export default Footer;
