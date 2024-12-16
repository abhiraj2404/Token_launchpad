import { TokenList } from "@/components/Mint/TokenList";
import { WalletStatus } from "@/components/WalletStatus";
import React from "react";

function MintPage() {
  const connected = true;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Mint Tokens</h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Manage your launched tokens and mint additional supply.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!connected ? (
          <WalletStatus message="Connect your wallet to view your tokens" />
        ) : (
          <TokenList />
        )}
      </div>
    </div>
  );
}

export default MintPage;
