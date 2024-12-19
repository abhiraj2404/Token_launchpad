import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Network, Globe } from "lucide-react";
import { useState } from "react";

type NetworkType = "devnet" | "mainnet";

export function NetworkSelector() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(
    process.env.NEXT_PUBLIC_SOLANA_NETWORK as NetworkType
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          startContent={
            selectedNetwork == "devnet" ? (
              <Globe className="h-4 w-4" />
            ) : (
              <Network className="h-4 w-4" />
            )
          }
          className="capitalize"
          size="sm"
        >
          {selectedNetwork}
        </Button>
      </DropdownTrigger>

      {selectedNetwork == "devnet" ? (
        <DropdownMenu aria-label="Network Selection">
          <DropdownItem
            key="devnet"
            startContent={<Globe className="h-4 w-4" />}
            description="Use for testing"
            className="text-warning"
          >
            Devnet
          </DropdownItem>
          <DropdownItem
            key="mainnet"
            startContent={<Network className="h-4 w-4" />}
            description="Production network"
            className="text-success"
            href="http://localhost:3000"
            target="_blank"
          >
            Mainnet
          </DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="Network Selection">
          <DropdownItem
            key="mainnet"
            startContent={<Network className="h-4 w-4" />}
            description="Production network"
            className="text-success"
          >
            Mainnet
          </DropdownItem>

          <DropdownItem
            key="devnet"
            startContent={<Globe className="h-4 w-4" />}
            description="Use for testing"
            className="text-warning"
            href="https://solanatokenlaunchpad.vercel.app/"
            target="_blank"
          >
            Devnet
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
}
