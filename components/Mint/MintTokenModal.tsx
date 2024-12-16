import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { TokenData } from "@/types";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { getConnection, mintTo } from "@/config/solana";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

interface MintTokenModalProps {
  isOpen: boolean;
  token: TokenData | null;
  onClose: () => void;
}

export function MintTokenModal({
  isOpen,
  token,
  onClose,
}: MintTokenModalProps) {
  const [formData, setFormData] = useState<any>({ amount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const connection = getConnection();
  const wallet = useWallet();
  const mint = token ? new PublicKey(token.mint) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (token.mintAuthority !== wallet.publicKey?.toBase58()) {
      alert("You are not the mint authority for this token");
      onClose();
      return;
    }
    const mintAmount = formData.amount * Math.pow(10, token.decimals);

    setIsLoading(true);

    try {
      if (mint && wallet.publicKey) {
        const tokenAccount = await getAssociatedTokenAddress(
          mint,
          wallet.publicKey,
          true,
          TOKEN_2022_PROGRAM_ID
        );

        await mintTo(
          connection,
          wallet, // Payer wallet
          mint, // Mint address
          tokenAccount, // Destination address
          wallet.publicKey, // Mint authority
          mintAmount // Amount to mint
        );
      }
      alert("Tokens minted successfully");
    } catch (error) {
      console.error("Error minting tokens:", error);
      alert("Error minting tokens");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!token) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Mint {token.symbol} Tokens</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Enter the amount of tokens you want to mint to your wallet.
              </p>
              <Input
                type="number"
                label="Amount"
                min="1"
                value={formData.amount.toString()}
                onChange={(e) =>
                  setFormData({ amount: parseInt(e.target.value) })
                }
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Mint Tokens
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
