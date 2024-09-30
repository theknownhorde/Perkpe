import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

const TransferPoints = () => {
  const [recipient, setRecipient] = useState('');
  const [points, setPoints] = useState(0);

  const handleTransfer = () => {
    console.log(`Transferred ${points} points to ${recipient}`);
    // Logic for actual transfer will go here
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Transfer Loyalty Points
        </Typography>
        <TextField
          label="Recipient Username"
          fullWidth
          margin="normal"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <TextField
          label="Points to Transfer"
          type="number"
          fullWidth
          margin="normal"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleTransfer}
        >
          Transfer Points
        </Button>
      </CardContent>
    </Card>
  );
};

export default TransferPoints;
