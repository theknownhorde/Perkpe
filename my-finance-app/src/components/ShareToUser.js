// src/components/ShareToUser.js
import React, { useState } from 'react';

const ShareToUser = () => {
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('');

  const handleShare = () => {
    alert(`Shared $${amount} with ${user}`);
  };

  return (
    <div className="share">
      <h3>Share to Another User</h3>
      <input
        type="text"
        placeholder="User's Email"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleShare}>Share</button>
    </div>
  );
};

export default ShareToUser;
