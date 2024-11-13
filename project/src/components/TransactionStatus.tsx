import React, { useState } from 'react';
import { CheckCircle2, Copy, Check } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionStatusProps {
  transaction: Transaction;
  onClose: () => void;
}

export function TransactionStatus({ transaction, onClose }: TransactionStatusProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyHash = () => {
    navigator.clipboard.writeText(transaction.hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(transaction.recipient);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const formatAddress = (address: string) => {
    // Ensure the address starts with '0x' if it doesn't already
    const formattedAddress = address.startsWith('0x') ? address : `0x${address}`;
    return formattedAddress;
  };

  const displayAddress = formatAddress(transaction.recipient);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-xl font-bold">Transaction Complete!</h3>
          <p className="text-gray-600 mt-2">Your transfer has been processed successfully.</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">${transaction.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Token:</span>
            <span className="font-medium">{transaction.token.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Recipient:</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm font-mono">{displayAddress.slice(0, 6)}...{displayAddress.slice(-4)}</span>
              <button
                onClick={copyAddress}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                title={copiedAddress ? "Copied!" : "Copy address"}
              >
                {copiedAddress ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Transaction Hash:</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm font-mono">{transaction.hash.slice(0, 6)}...{transaction.hash.slice(-4)}</span>
              <button
                onClick={copyHash}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                title={copiedHash ? "Copied!" : "Copy hash"}
              >
                {copiedHash ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}