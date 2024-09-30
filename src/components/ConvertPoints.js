import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

const ConvertPoints = () => {
  const [pointsToConvert, setPointsToConvert] = useState(0);

  const handleConvert = () => {
    console.log(`Converted ${pointsToConvert} points to bank rewards`);
    // Logic for conversion goes here
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Convert Points to Bank Rewards
        </Typography>
        <TextField
          label="Points to Convert"
          type="number"
          fullWidth
          margin="normal"
          value={pointsToConvert}
          onChange={(e) => setPointsToConvert(Number(e.target.value))}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleConvert}
        >
          Convert Points
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConvertPoints;
