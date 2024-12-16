"use client";
import { AirdropCard } from "@/components/Airdrop/Airdropcard";
import { WalletStatus } from "@/components/WalletStatus";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

function AirdropPage() {
  const { connected } = useWallet();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Get Test SOL
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Request an airdrop of 1 SOL to test token creation on Solana Devnet.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        {!connected ? (
          <WalletStatus message="Connect your wallet to request an airdrop" />
        ) : (
          <AirdropCard />
        )}
      </div>
    </div>
  );
}

export default AirdropPage;
