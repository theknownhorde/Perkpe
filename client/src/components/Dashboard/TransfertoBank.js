// src/components/Dashboard/TransferToBank.js
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

const TransferToBank = () => {
  const [bankAccount, setBankAccount] = useState('');
  const [points, setPoints] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bankAccount || !points) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await api.post('/api/transfer/bank', {
        bankAccount,
        points: parseInt(points),
      });
      alert(`Successfully transferred ${points} points to bank account ${bankAccount}.`);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to transfer points to bank.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Transfer Points to Bank Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Bank Account Number"
            fullWidth
            required
            margin="normal"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
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
              Transfer to Bank
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default TransferToBank;
