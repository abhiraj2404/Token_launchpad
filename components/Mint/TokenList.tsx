"use client";
import { getConnection } from "@/config/solana";
import { TokenData } from "@/types";
import { Spinner } from "@nextui-org/spinner";
import {
  getMint,
  getTokenMetadata,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import tokenmint from "@/data/TokenMints.json";
import { MintTokenModal } from "./MintTokenModal";
import TokenCard from "./TokenCard";

async function fetchUserTokens(userPublicKey: any): Promise<TokenData[]> {
  const connection = getConnection();
  const tokens: TokenData[] = [];
  // const data = JSON.parse(JSON.stringify(tokenmint));

  const response = await fetch("/api/tokenMints");
  const data = await response.json();
  const mintAddresses = data.addresses;
  for (const mintAddress of mintAddresses) {
    try {
      const mintPubkey = new PublicKey(mintAddress);
      const metadata = await getTokenMetadata(
        connection,
        mintPubkey,
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );
      const mintInfo = await getMint(
        connection,
        mintPubkey,
        "confirmed",
        TOKEN_2022_PROGRAM_ID
      );
      const uriResponse = await fetch(metadata?.uri as string);
      const uriData = await uriResponse.json();

      if (mintInfo.mintAuthority?.toBase58() == userPublicKey)
        tokens.push({
          mint: mintAddress,
          name: metadata?.name || "Unknown",
          symbol: metadata?.symbol || "Unknown",
          decimals: mintInfo.decimals,
          totalSupply:
            Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals),
          imageUrl: uriData?.image || "",
          mintAuthority: mintInfo.mintAuthority?.toBase58() || "None",
          freezeAuthority: metadata?.updateAuthority?.toBase58() || null,
        });
    } catch (error) {
      console.error(`Error fetching token ${mintAddress}:`, error);
    }
  }

  return tokens;
}

export function TokenList() {
  const wallet = useWallet();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const [showMintModal, setShowMintModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTokens() {
      if (wallet.publicKey) {
        try {
          const userTokens = await fetchUserTokens(wallet.publicKey);
          setTokens(userTokens);
        } catch (error) {
          console.error("Error loading tokens:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadTokens();
  }, [wallet.publicKey]);

  const handleMint = (token: TokenData) => {
    setSelectedToken(token);
    setShowMintModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tokens.map((token) => (
        <TokenCard
          key={token.mint}
          token={token}
          onMint={() => handleMint(token)}
        />
      ))}

      {tokens.length === 0 && (
        <div className="text-center py-12 bg-content2 rounded-lg">
          <p className="text-foreground/60">
            You haven&apos;t created any tokens yet.
          </p>
        </div>
      )}
  
      <MintTokenModal
        isOpen={showMintModal}
        token={selectedToken}
        onClose={() => {
          setShowMintModal(false);
          setSelectedToken(null);
        }}
      />
    </div>
  );
}
