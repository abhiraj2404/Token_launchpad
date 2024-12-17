import { siteConfig } from "@/config/site";
import { Coins, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-content1 border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Coins className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Token Launchpad
              </span>
            </div>
            <p className="text-foreground/60 max-w-md">
              Launch your custom tokens on Solana with ease. Simple, fast, and
              secure token creation platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/create"
                  className="text-foreground/60 hover:text-foreground"
                >
                  Create Token
                </Link>
              </li>
              <li>
                <Link
                  href="/mint"
                  className="text-foreground/60 hover:text-foreground"
                >
                  My Tokens
                </Link>
              </li>
              <li>
                <Link
                  href="/airdrop"
                  className="text-foreground/60 hover:text-foreground"
                >
                  Airdrop
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-foreground/60 text-sm mt-8">
          © {new Date().getFullYear()} Token Launchpad. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
