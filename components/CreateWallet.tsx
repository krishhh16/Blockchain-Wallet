import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import { toast, Toaster } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SeedPhraseDropdown from './DropDown'
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from '@solana/web3.js'
import WalletSection from './ui/NewWallets'
import bs58 from "bs58"

type Wallet = {
    publicKey: string;
    privateKey: string;
  };

function CreateWallet() {
    const [mnemonics, setMnemonics] = useState<String[] | null>(null)
    const [mnemonicLength, setLength] = useState<number>(12)
    const [accountCount, setAccLen] = useState<number>(0)
    const [seed, setSeed] = useState<Buffer>()
    const [wallets, setWallets] = useState<Wallet[]>([])

    const handleCreateWallet = async () => {
        const newMnemonics = generateMnemonic(mnemonicLength == 12 ? 128 : 256);
        const seedPhrase = mnemonicToSeedSync(newMnemonics)
        setSeed(seedPhrase)
        const path = `m/44'/501'/${accountCount}'/0'`
        const derivedSeed = derivePath(path, seedPhrase.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        setAccLen(accountCount + 1)
        setWallets([{publicKey: Keypair.fromSecretKey(secret).publicKey.toString(), privateKey: bs58.encode(Keypair.fromSecretKey(secret).secretKey) }] )
        setMnemonics(newMnemonics.split(" "))
        toast("Wallet Has been created")
    }

    const createAccount = () => {
        const path = `m/44'/501'/${accountCount}'/0'`
        if (seed){
            console.log(accountCount)
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            setAccLen(accountCount + 1)
            setWallets(prevVals => [...prevVals, {publicKey: Keypair.fromSecretKey(secret).publicKey.toString(), privateKey: bs58.encode(Keypair.fromSecretKey(secret).secretKey)}])
        }
    }
    return (
        <div className='mt-[10vh]'>
            {
                mnemonics ?
                    <div  >
                        <SeedPhraseDropdown seedPhrase={mnemonics}/>
                        <WalletSection setAccLen={setAccLen} setMnemonics={setMnemonics} setWallet={setWallets} createAccount={createAccount}  wallets={wallets}/>
                    </div>
                    :
                    <div className="border-b flex justify-between" >
                        <div className="w-[45%] mb-4 flex items-center">
                            <h1 className="font-semibold text-xl">Step 1: Generate your wallet by clicking the Create wallet button</h1>
                        </div>
                        <div className="flex pr-2 justify-end gap-10 ">
                            <div className='flex h-full items-start'>
                                <RadioGroup defaultValue="option-one">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem onClick={() => setLength(12)} style={{backgroundColor: "white"}} value="option-one" id="option-one" />
                                        <h1>12 words</h1>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem  value="option-two" style={{backgroundColor: "white"}} onClick={() => setLength(24)} id="option-two" />
                                        <h1>24 words</h1>
                                    </div>
                                </RadioGroup>
                            </div>
                            <Button onClick={handleCreateWallet} className="font-bold" variant={"secondary"}>
                                Create wallet
                            </Button>
                        </div>
                    </div>

            }
            <Toaster />
        </div>
    )
}

export default CreateWallet
