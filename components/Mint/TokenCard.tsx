
import { TokenData } from '@/types';
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Tooltip } from '@nextui-org/tooltip';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface TokenCardProps {
  token: TokenData;
  onMint: () => void;
}

export default function TokenCard({ token, onMint }: TokenCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Card className="bg-content1 border border-divider">
      <div className="p-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <img
              src={token.imageUrl}
              alt={token.name}
              className="w-24 h-24 rounded-lg object-cover bg-content2"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {token.name} ({token.symbol})
                </h3>
                <p className="mt-1 text-sm text-foreground/60">
                  Total Supply: {token.totalSupply.toLocaleString()} {token.symbol}
                </p>
              </div>
              <Button
                color="primary"
                onClick={onMint}
              >
                Mint Tokens
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <AddressRow
                label="Mint Address"
                value={token.mint}
                onCopy={() => handleCopy(token.mint, 'mint')}
                copied={copiedField === 'mint'}
              />
              <AddressRow
                label="Mint Authority"
                value={token.mintAuthority}
                onCopy={() => handleCopy(token.mintAuthority, 'mintAuth')}
                copied={copiedField === 'mintAuth'}
              />
              {token.freezeAuthority && (
                <AddressRow
                  label="Freeze Authority"
                  value={token.freezeAuthority}
                  onCopy={() => handleCopy(token.freezeAuthority!, 'freezeAuth')}
                  copied={copiedField === 'freezeAuth'}
                />
              )}
              <p className="text-sm text-foreground/60">
                Decimals: {token.decimals}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}


interface AddressRowProps {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}

function AddressRow({ label, value, onCopy, copied }: AddressRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm text-foreground/60">
          {label}:
          <span className="ml-2 font-mono break-all">
            {value.slice(0, 16)}...{value.slice(-8)}
          </span>
        </p>
      </div>
      <Tooltip content={copied ? "Copied!" : "Copy to clipboard"}>
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
      </Tooltip>
    </div>
  );
}