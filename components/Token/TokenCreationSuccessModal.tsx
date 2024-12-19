import { TokenMetadata } from "@/types";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { ExternalLink, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

interface TokenCreationSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  tokenData: TokenMetadata;
}

const selectedNetwork = process.env.NEXT_PUBLIC_SOLANA_NETWORK;

export default function TokenCreationSuccessModal({
  isOpen,
  onClose,
  tokenData,
}: TokenCreationSuccessProps) {
  const explorerUrl = `https://explorer.solana.com/address/${tokenData.mint}?cluster=${selectedNetwork == "mainnet" ? "mainnet-beta" : "devnet"}`;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        base: "bg-content1",
        header: "border-b border-divider",
        body: "py-6",
        footer: "border-t border-divider",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground">
            Token Created Successfully!
          </h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Token Details
              </h3>
              <div className="space-y-4">
                <DetailRow label="Name" value={tokenData.name} />
                <DetailRow label="Symbol" value={tokenData.symbol} />
                <DetailRow
                  label="Token Address"
                  value={tokenData.mint}
                  onCopy={() => handleCopy(tokenData.mint, "mint")}
                  copied={copiedField === "mint"}
                />
                <DetailRow
                  label="Mint Authority"
                  value={tokenData.mintAuthority}
                  onCopy={() =>
                    handleCopy(tokenData.mintAuthority, "authority")
                  }
                  copied={copiedField === "authority"}
                />
                <DetailRow
                  label="Total Supply"
                  value={`${tokenData.initialMintAmount.toLocaleString()} ${tokenData.symbol}`}
                />
                <DetailRow
                  label="Decimals"
                  value={tokenData.decimals.toString()}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            as={Link}
            href={explorerUrl}
            target="_blank"
            color="primary"
            variant="flat"
            startContent={<ExternalLink size={18} />}
          >
            View on Explorer
          </Button>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  onCopy?: () => void;
  copied?: boolean;
}

function DetailRow({ label, value, onCopy, copied }: DetailRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span className="text-sm font-medium text-foreground/60 sm:w-1/3">
        {label}:
      </span>
      <div className="sm:w-2/3 flex items-center gap-2">
        <span className="text-sm font-mono text-foreground break-all">
          {value}
        </span>
        {onCopy && (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={onCopy}
            className="text-foreground/60 hover:text-foreground"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
