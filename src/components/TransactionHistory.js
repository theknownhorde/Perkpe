import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const transactions = [
  { id: 1, type: 'Transfer', details: 'Sent 100 points to user123' },
  { id: 2, type: 'Conversion', details: 'Converted 200 points to bank rewards' },
];

const TransactionHistory = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Transaction History
        </Typography>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemText primary={transaction.type} secondary={transaction.details} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
