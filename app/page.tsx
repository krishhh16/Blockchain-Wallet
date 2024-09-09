'use client'

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import CreateWallet from "@/components/CreateWallet";

export default function Home() {
  const router = useRouter();


  return (
    <div className="max-w-4xl mx-auto p-4 h-full">
      <Navbar/>
      <CreateWallet/>
     
    </div>
  );
}
