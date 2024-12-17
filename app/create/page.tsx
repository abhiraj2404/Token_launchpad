"use client";

import TokenForm from "@/components/Token/TokenForm";
import { Card } from "@nextui-org/card";
import { useWallet } from "@solana/wallet-adapter-react";
import { Coins } from "lucide-react";
import React from "react";

function CreatetokenPage() {
  const { connected } = useWallet();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[47vh] mb-24">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Coins className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Create Your Token
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Fill in the details below to launch your custom token on Solana.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!connected ? (
          <Card
            className="py-10 px-28 text-center bg-content1 w-fit mx-auto"
            isPressable
          >
            <p className="text-foreground/70 text-center w-full">
              Please connect your wallet to create a token
            </p>
          </Card>
        ) : (
          <TokenForm />
        )}
      </div>
    </div>
  );
}

export default CreatetokenPage;
