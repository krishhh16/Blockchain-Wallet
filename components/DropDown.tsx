import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast, Toaster } from "sonner"

const SeedPhraseDisplay = ({ seedPhrase }: { seedPhrase: String[] }) => {
  const [isVisible, setIsVisible] = useState(false); // Default to hidden

  const handleCopy = () => {
    const seeds = seedPhrase.join(' ');
    navigator.clipboard.writeText(seeds);
    toast("Copied to clipboard")
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="max-w-3xl w-3/4 mx-auto p-6 bg-black/75 text-white rounded-md shadow-md relative">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-xl text-center font-semibold mb-4">
          Your Seed Phrase
        </h2>
        <div className="flex gap-4">
          <Button variant={"secondary"} onClick={handleCopy}>
            Copy to Clipboard
          </Button>
          <Button variant={"outline"} onClick={toggleVisibility}>
            {isVisible ? 'Hide Seed Phrase' : 'Show Seed Phrase'}
          </Button>
        </div>
      </div>

      <p className="text-sm text-center mb-4">
        Please write down or securely save these words. This is the only way to recover your wallet.
      </p>
      
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isVisible ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-3 gap-2">
          {seedPhrase.map((word: String, index: number) => (
            <div
              key={index}
              className="bg-gray-700/25 text-center py-2 rounded-md shadow-sm"
            >
              <span className="font-mono text-sm">{index + 1}. {word}</span>
            </div>
          ))}
        </div>
      </div>

      <Toaster/>
    </div>
  );
};

export default SeedPhraseDisplay;
