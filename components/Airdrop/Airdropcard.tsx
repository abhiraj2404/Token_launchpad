"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";
import { Button } from "@nextui-org/button";
import { getConnection } from "@/config/solana";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function AirdropCard() {
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleAirdrop = async () => {
    setIsLoading(true);

    if (!publicKey) return;

    try {
      const connection = getConnection();
      const signature = await connection.requestAirdrop(
        publicKey,
        LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(signature);
      alert("Airdrop successful!, check your balance");
    } catch (error) {
      alert("Failed to request airdrop, some error occured");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-content1 border border-divider rounded-lg shadow-sm max-w-xl mx-auto">
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Your Wallet
          </h3>
          <p className="text-sm text-foreground/60 break-all font-mono">
            {publicKey?.toString()}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-content2 rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-1">
              Amount to receive:
            </p>
            <p className="text-2xl font-bold text-foreground">1 SOL</p>
          </div>

          <Button
            color="primary"
            onClick={handleAirdrop}
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading ? "Requesting Airdrop..." : "Request Airdrop"}
          </Button>
        </div>
      </div>
    </div>
  );
}
