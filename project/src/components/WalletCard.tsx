import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { AddressBar } from './AddressBar';
import { TokenCard } from './TokenCard';
import { TransactionStatus } from './TransactionStatus';
import { Token, Transaction } from '../types';
import { generateTransactionHash } from '../utils/transaction';
import { isValidEthereumAddress } from '../utils/validation';

const tokens: Token[] = [
  {
    name: 'Amazon Gift Card',
    symbol: 'AMZN',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop',
    balance: 500.00
  },
  {
    name: 'Myntra Gift Card',
    symbol: 'MNTR',
    logo: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop',
    balance: 350.00
  },
  {
    name: 'H&M Gift Card',
    symbol: 'HM',
    logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop',
    balance: 250.00
  },
];

export default function WalletCard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [address] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [addressError, setAddressError] = useState('');

  const validateAddress = (address: string) => {
    if (!address) {
      setAddressError('Address is required');
      return false;
    }
    if (!isValidEthereumAddress(address)) {
      setAddressError('Invalid Ethereum address format');
      return false;
    }
    setAddressError('');
    return true;
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipient(value);
    if (value) validateAddress(value);
  };

  const handleSend = () => {
    if (!validateAddress(recipient) || !amount) return;

    const formattedRecipient = recipient.startsWith('0x') ? recipient : `0x${recipient}`;

    const newTransaction: Transaction = {
      hash: generateTransactionHash(),
      amount: parseFloat(amount),
      recipient: formattedRecipient,
      token: selectedToken,
      timestamp: Date.now()
    };

    setTransaction(newTransaction);
    setRecipient('');
    setAmount('');
    setAddressError('');
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <h1 className="text-white text-xl font-bold mb-4">Crypto Wallet</h1>
        <AddressBar address={address} />
      </div>

      <div className="p-6 space-y-6">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img src={selectedToken.logo} alt={selectedToken.name} className="w-8 h-8 rounded-full" />
              <span className="font-medium">{selectedToken.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-600">${selectedToken.balance}</span>
              <ChevronDown className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {showDropdown && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
              {tokens.map((token) => (
                <TokenCard
                  key={token.symbol}
                  token={token}
                  onClick={() => {
                    setSelectedToken(token);
                    setShowDropdown(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Transfer {selectedToken.name}</h2>
            <span className="text-gray-600">Balance: ${selectedToken.balance}</span>
          </div>
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Recipient Address (0x...)"
              value={recipient}
              onChange={handleRecipientChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono ${
                addressError ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {addressError && (
              <div className="flex items-center space-x-1 text-red-500 text-sm">
                <AlertCircle size={14} />
                <span>{addressError}</span>
              </div>
            )}
          </div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={selectedToken.balance}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!recipient || !amount || parseFloat(amount) > selectedToken.balance || !!addressError}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>

      {transaction && (
        <TransactionStatus
          transaction={transaction}
          onClose={() => setTransaction(null)}
        />
      )}
    </div>
  );
}