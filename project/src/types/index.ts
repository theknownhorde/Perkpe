export interface Token {
  name: string;
  symbol: string;
  logo: string;
  balance: number;
}

export interface Transaction {
  hash: string;
  amount: number;
  recipient: string;
  token: Token;
  timestamp: number;
}