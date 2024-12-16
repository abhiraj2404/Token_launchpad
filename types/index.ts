import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface TokenFormData {
  name: string;
  symbol: string;
  decimals: number;
  initialMintAmount: number;
}

export interface TokenMetadata {
  mint: string;
  mintAuthority: string;
  name: string;
  symbol: string;
  decimals: number;
  initialMintAmount: number;
}

export interface TokenData {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  imageUrl: string;
  mintAuthority: string;
  freezeAuthority: string | null;
}
