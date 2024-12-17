"use client";

import { TokenList } from "@/components/Mint/TokenList";
import { Card } from "@nextui-org/card";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

function MintPage() {
  const { connected } = useWallet();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">My Tokens</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Manage your launched tokens and mint additional supply.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!connected ? (
          <Card
            className="py-10 px-28 text-center bg-content1 w-fit mx-auto"
            isPressable
          >
            <p className="text-foreground/70 text-center w-full">
              Please connect your wallet to mint tokens.
            </p>
          </Card>
        ) : (
          <TokenList />
        )}
      </div>
    </div>
  );
}

export default MintPage;
