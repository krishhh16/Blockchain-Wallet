import React, { useState } from 'react';
import { Button } from './button'; 

type Wallet = {
  publicKey: string;
  privateKey: string;
};

const WalletSection = ({ wallets, createAccount , setWallet, setMnemonics, setAccLen}: {setAccLen: React.Dispatch<React.SetStateAction<number>>, setMnemonics: React.Dispatch<React.SetStateAction<String[] | null>> , wallets: Wallet[], createAccount: () => void, setWallet: React.Dispatch<React.SetStateAction<Wallet[]>> }) => {
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
            createAccount();
          }} variant="secondary">Add Wallet</Button>
          <Button onClick={() => {
            setAccLen(0)
            setWallet([])
            setMnemonics(null)
          }} variant="secondary">Clear Wallets</Button>
        </div>
      </div>

      {wallets.map((wallet, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-900/75 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Account {index + 1}</h2>
            <button
              onClick={() => {
                setWallet(prevVals => {
                    return [...prevVals.slice(0, index), ...prevVals.slice(index + 1)]
                })
              }}
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
                {
                showPrivateKeys[index] ?
                wallet.privateKey.slice(0, 20) + "...." + wallet.privateKey.slice(69, -1)
                : "*".repeat(40)
                }
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
