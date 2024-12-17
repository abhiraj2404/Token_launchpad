"use client";

import { TokenFormData, TokenMetadata } from "@/types";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React, { useRef, useState } from "react";
import TokenCreationSuccessModal from "./TokenCreationSuccessModal";
import { createToken } from "@/config/solana";
import { useWallet } from "@solana/wallet-adapter-react";
import { Upload } from "lucide-react";

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
  const [loadingText, setLoadingText] = useState("Launch Token");
  const [file, setFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [URI, setURI] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenMetadata | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof TokenFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(e.target?.files?.[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      const data = new FormData();
      data.set("file", file, formData.name);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const imageURL = await uploadRequest.json();
      setImageURL(imageURL);
      return imageURL;
    } catch (e) {
      console.log(e);
      alert("Trouble uploading file");
    }
  };

  const uploadMetadata = async (metadata: object) => {
    try {
      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });

      const metadataFormData = new FormData();
      metadataFormData.set(
        "file",
        metadataBlob,
        `metadata-${formData.name}.json`
      );

      const response = await fetch("/api/files", {
        method: "POST",
        body: metadataFormData,
      });

      if (!response.ok) throw new Error("Failed to upload metadata");

      alert("Metadata uploaded successfully!");

      const metadataURI = await response.json();
      console.log("Metadata URI in upload metadata function:", metadataURI);
      return metadataURI;
    } catch (e) {
      console.error("Error uploading metadata:", e);
      alert("Trouble uploading metadata");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setLoadingText("Uploading metadata files...");
      const imageURL = await uploadImageFile();
      if (imageURL) {
        //metadata upload
        const metadata = {
          name: formData.name,
          symbol: formData.symbol,
          image: imageURL,
        };
        const metadataURI = await uploadMetadata(metadata);
        console.log("Metadata URI just before createtoken:", metadataURI);

        //create token
        setLoadingText("Creating token...");
        const result = await createToken(formData, wallet, metadataURI);

        setLoadingText("Storing to db...");
        const response = await fetch("/api/tokenMints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: result.mint }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        setTokenData(result);
      }

      setShowSuccess(true);
    } catch (error) {
      console.error("Error creating token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="p-6 w-full" shadow="sm">
        <form onSubmit={handleSubmit} className="flex *:w-1/2 gap-6 space-y-6">
          {/* Image Upload Section */}
          <button
            className="border-2 border-dashed rounded-lg text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="NFT Preview"
                  className="max-h-[400px] mx-auto rounded-lg"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8" />
                <div className="text-lg font-semibold">Drag and drop media</div>
                <div className="text-sm text-default-500">Browse files</div>
                <div className="text-xs text-default-400">
                  Max size: 50MB
                  <br />
                  JPG, PNG, GIF, SVG
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,video/mp4"
              onChange={handleImageUpload}
            />
          </button>

          <div className="flex flex-col gap-6 m-0">
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
              maxLength={10}
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
              {isLoading ? loadingText : "Launch Token"}
            </Button>
          </div>
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
