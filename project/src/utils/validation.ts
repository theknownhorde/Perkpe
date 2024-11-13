// Ethereum address validation
export function isValidEthereumAddress(address: string): boolean {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
}

// Check address checksum
export function isChecksumAddress(address: string): boolean {
  // Remove '0x' prefix
  address = address.replace('0x', '');
  
  // Convert address to lowercase and uppercase for comparison
  const addressLower = address.toLowerCase();
  const addressUpper = address.toUpperCase();
  
  // If the address is all lowercase or all uppercase, it's not checksummed
  if (addressLower === address || addressUpper === address) {
    return true;
  }
  
  // Keccak-256 hash of the lowercase address
  const addressHash = Array.from(address.toLowerCase())
    .map((char, idx) => {
      const charCode = char.charCodeAt(0);
      return charCode > 57 ? // is letter, not number
        (parseInt(addressHash[idx], 16) > 7 ? char.toUpperCase() : char.toLowerCase()) :
        char;
    })
    .join('');
  
  return address === addressHash;
}

export function getNetworkFromAddress(address: string): string {
  // In a real app, this would make an API call to check the network
  // For demo purposes, we'll determine based on address pattern
  if (address.startsWith('0x742d')) {
    return 'Ethereum Mainnet';
  } else if (address.startsWith('0x89')) {
    return 'Polygon';
  } else if (address.startsWith('0xb')) {
    return 'Binance Smart Chain';
  }
  return 'Unknown Network';
}