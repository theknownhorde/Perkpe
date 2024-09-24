// src/components/Dashboard/TransactionsList.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import api from '../../services/api';


const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from backend
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/api/transactions');
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch transactions.');
      }
    };
    fetchTransactions();
  }, []);

  return (
    <List>
      {transactions.length === 0 ? (
        <ListItem>
          <ListItemText primary="No transactions found." />
        </ListItem>
      ) : (
        transactions.map((transaction) => (
          <React.Fragment key={transaction._id}>
            <ListItem>
              <ListItemText
                primary={`${transaction.type} of ${transaction.amount} points`}
                secondary={`Date: ${new Date(transaction.date).toLocaleString()}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
};

export default TransactionsList;
