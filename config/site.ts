export type SiteConfig = typeof siteConfig;

const selectedNetwork = process.env.NEXT_PUBLIC_SOLANA_NETWORK as
  | "devnet"
  | "mainnet";

export const siteConfig = {
  name: "Solana Token Launchpad",
  description: "Launch your token on the Solana blockchain in minutes.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create Token",
      href: "/create",
    },
    {
      label: "My Tokens",
      href: "/mint",
    },
    ...(selectedNetwork == "devnet"
      ? [{ label: "Airdrop", href: "/airdrop" }]
      : []), // Add 'Airdrop' conditionally
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create Token",
      href: "/create",
    },
    {
      label: "Mint Tokens",
      href: "/mint",
    },
    ...(selectedNetwork == "devnet"
      ? [{ label: "Airdrop", href: "/airdrop" }]
      : []),
  ],
  links: {
    github: "https://github.com/abhiraj2404/Token_launchpad",
    twitter: "https://x.com/abhiraj_2404",
  },
};
