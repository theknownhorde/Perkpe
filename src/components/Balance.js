import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Balance = () => {
  const [points, setPoints] = useState(1000);  // Dummy value for now

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Loyalty Points Balance
        </Typography>
        <Typography variant="h4" color="primary">
          {points} Points
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Balance;
