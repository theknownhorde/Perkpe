// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TransactionsList from './TransactionsList';
import api from '../../services/api';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
const Dashboard = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Fetch user's points from backend
    const fetchPoints = async () => {
      try {
        const response = await api.get('/api/points');
        setPoints(response.data.points);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch points.');
      }
    };
    fetchPoints();
  }, []);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6">
          Total Loyalty Points: <strong>{points}</strong>
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/transfer-points"
            sx={{ mr: 2 }}
          >
            Transfer Points to User
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/transfer-to-bank"
          >
            Transfer Points to Bank
          </Button>
        </Box>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Recent Transactions
          </Typography>
          <TransactionsList />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
