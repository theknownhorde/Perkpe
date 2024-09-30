// src/components/SendToBank.js
import React, { useState } from 'react';

const SendToBank = () => {
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    alert(`Sent $${amount} to ${bank}`);
  };

  return (
    <div className="send-bank">
      <h3>Send to Bank</h3>
      <input
        type="text"
        placeholder="Bank Account"
        value={bank}
        onChange={(e) => setBank(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSend}>Send to Bank</button>
    </div>
  );
};

export default SendToBank;
