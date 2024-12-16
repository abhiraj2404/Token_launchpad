"use client";

import { TokenFormData, TokenMetadata } from "@/types";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import TokenCreationSuccessModal from "./TokenCreationSuccessModal";
import { createToken } from "@/config/solana";
import { useWallet } from "@solana/wallet-adapter-react";

const initialFormData: TokenFormData = {
  name: "",
  symbol: "",
  decimals: 9,
  initialMintAmount: 100,
};

const dummyTokenMetadata: TokenMetadata = {
  mint: "3kH9fZnYqDfPz3x5Qf8mK2fUyUxtjhgHb3Wq7N7s8X4A",
  mintAuthority: "B2cN8jTy5XQoQ9Bd7pWV7pJkqD8WRzF5j9p6bHqLn3k4",
  name: "DummyToken",
  symbol: "DMT",
  decimals: 6,
  initialMintAmount: 1000000,
};

function TokenForm() {
  const wallet = useWallet();
  const [formData, setFormData] = useState<TokenFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenData, setTokenData] = useState<TokenMetadata | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    field: keyof TokenFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createToken(formData, wallet);
      setTokenData(result);
      setShowSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="p-6" shadow="sm">
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-6">
          <Input
            label="Token Name"
            placeholder="My Token"
            labelPlacement="outside"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            variant="bordered"
          />

          <Input
            label="Token Symbol"
            placeholder="MTK"
            labelPlacement="outside"
            maxLength={8}
            value={formData.symbol}
            onChange={(e) =>
              handleInputChange("symbol", e.target.value.toUpperCase())
            }
            required
            variant="bordered"
          />

          <Input
            type="number"
            label="Decimals"
            labelPlacement="outside"
            placeholder="9"
            min="0"
            max="9"
            value={formData.decimals.toString()}
            onChange={(e) =>
              handleInputChange("decimals", parseInt(e.target.value))
            }
            required
            variant="bordered"
          />

          <Input
            type="number"
            label="Initial Mint Amount"
            labelPlacement="outside"
            placeholder="100"
            min="1"
            value={formData.initialMintAmount.toString()}
            onChange={(e) =>
              handleInputChange("initialMintAmount", parseInt(e.target.value))
            }
            required
            variant="bordered"
          />

          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading ? "Creating Token..." : "Launch Token"}
          </Button>
        </form>
      </Card>

      {tokenData && (
        <TokenCreationSuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          tokenData={tokenData}
        />
      )}
    </>
  );
}

export default TokenForm;
