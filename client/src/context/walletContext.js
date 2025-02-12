import React, { createContext, useState } from 'react';

// Create a context for the wallet address
export const WalletContext = createContext();

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};