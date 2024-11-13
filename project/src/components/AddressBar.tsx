import React, { useState } from 'react';
import { Copy, CheckCircle, Network } from 'lucide-react';
import { getNetworkFromAddress } from '../utils/validation';

interface AddressBarProps {
  address: string;
}

export function AddressBar({ address }: AddressBarProps) {
  const [copied, setCopied] = useState(false);
  const network = getNetworkFromAddress(address);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-white text-sm font-medium font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <button 
            onClick={copyAddress}
            className="text-white/80 hover:text-white transition-colors"
            title={copied ? "Copied!" : "Copy address"}
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <div className="flex items-center space-x-2 text-white/80">
          <Network size={14} />
          <span className="text-xs">{network}</span>
        </div>
      </div>
    </div>
  );
}