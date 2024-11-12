import React from 'react';
import './Card.scss';

const Card = ({ title, credits }) => {
  const openMetamask = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
    } else {
      alert('Please install MetaMask!');
      window.open('https://metamask.io', '_blank');
    }
  };

  return (
    <div className='card'>
      <h3>{title}</h3>
      <p>Credits Available: {credits}</p>
      <button onClick={openMetamask}>Buy</button>
      <button onClick={openMetamask}>Sell</button>
    </div>
  );
};

export default Card;