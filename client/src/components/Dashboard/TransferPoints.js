// src/components/Dashboard/TransferPoints.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const TransferPoints = () => {
  const [recipient, setRecipient] = useState('');
  const [points, setPoints] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipient || !points) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await api.post('/api/transfer/points', {
        recipient,
        points: parseInt(points),
      });
      alert(`Successfully transferred ${points} points to ${recipient}.`);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to transfer points.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Transfer Points to User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Recipient Username"
            fullWidth
            required
            margin="normal"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <TextField
            label="Points to Transfer"
            type="number"
            fullWidth
            required
            margin="normal"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            inputProps={{ min: 1 }}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Transfer Points
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default TransferPoints;
