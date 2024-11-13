import React from 'react';
import { Token } from '../types';

interface TokenCardProps {
  token: Token;
  onClick: () => void;
}

export function TokenCard({ token, onClick }: TokenCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <img src={token.logo} alt={token.name} className="w-8 h-8 rounded-full" />
        <span className="font-medium">{token.name}</span>
      </div>
      <span className="text-gray-600 font-medium">${token.balance}</span>
    </button>
  );
}