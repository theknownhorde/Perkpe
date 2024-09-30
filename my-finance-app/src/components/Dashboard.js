// src/components/Dashboard.js
import React from 'react';
import BalanceAvailable from './BalanceAvailable';
import ShareToUser from './ShareToUser';
import SendToBank from './SendToBank';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Finance Dashboard</h2>
      <BalanceAvailable />
      <ShareToUser />
      <SendToBank />
    </div>
  );
};

export default Dashboard;
