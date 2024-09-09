import React, { useState } from 'react';
import { Button } from './button'; 

type Wallet = {
  publicKey: string;
  privateKey: string;
};

const WalletSection = ({ wallets, setWallets }: { wallets: Wallet[], setWallets: any }) => {
  const [showPrivateKeys, setShowPrivateKeys] = useState(
    Array(wallets.length).fill(false)
  );

  const togglePrivateKeyVisibility = (index: number) => {
    setShowPrivateKeys((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black/75 text-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Solana Wallet</h1>
        <div className="flex gap-4">
          <Button onClick={() => {
            setWallets();
          }} variant="secondary">Add Wallet</Button>
          <Button variant="secondary">Clear Wallets</Button>
        </div>
      </div>

      {wallets.map((wallet, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-900/75 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Wallet {index + 1}</h2>
            <button
              onClick={() => 
                setWallets((prevVals: Wallet[]) => { 
                   
                })

              }
              className="text-red-500"
              title="Delete Wallet"
            >
              🗑️
            </button>
          </div>

          <div className="mb-2">
            <strong>Public Key: </strong>
            <span>{wallet.publicKey}</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <strong>Private Key: </strong>
              <span>
                {showPrivateKeys[index]
                  ? wallet.privateKey
                  : '•'.repeat(40)}
              </span>
            </div>
            <button
              onClick={() => togglePrivateKeyVisibility(index)}
              className="text-gray-400 hover:text-white ml-2"
            >
              👁️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletSection;
